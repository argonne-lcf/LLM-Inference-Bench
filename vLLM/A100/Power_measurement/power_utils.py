"""
File: power_utils.py
Author: Farah Ferdaus
Email: fferdaus@anl.gov
Last updated: Jul 22, 2024
Description: A power analysis routine using built-in power monitoring tools provided by the vendor.
"""

import multiprocessing
import os
import time
from py3nvml.py3nvml import nvmlDeviceGetPowerUsage,  \
    nvmlDeviceGetCount,  \
    nvmlDeviceGetHandleByIndex, \
    nvmlInit, \
    nvmlShutdown

class gpuPowerProbe(object):
    def __init__(self, interval, gpu_id=-1):
        self.interval = multiprocessing.Value('d', interval)
        self.len = int(7200/interval)
        self.powers = multiprocessing.Array('d', self.len)
        self.times = multiprocessing.Array('d', self.len)
        self.gpu_id = multiprocessing.Value('i', gpu_id)  
        self.process = None
        self.prevTime = multiprocessing.Value('d',time.time())
        self.halt = multiprocessing.Value('i',1)  
        self.count = multiprocessing.Value('i',0)
        self.isrunning = multiprocessing.Value('i',0)
        self.alive = multiprocessing.Value('i',0)  
        self.init()

    def _getGpuPower(self, powers, times, gpu_id, count, halt, alive, isrunning, prevTime, interval):
        nvmlInit()
        while (alive.value):
            while (not halt.value):
                isrunning.value = 1
                if gpu_id.value > -1:
                    power = nvmlDeviceGetPowerUsage(nvmlDeviceGetHandleByIndex(gpu_id.value))
                else:
                    power = 0
                    num_gpus = nvmlDeviceGetCount()
                    for i in range(num_gpus):
                        power += nvmlDeviceGetPowerUsage(nvmlDeviceGetHandleByIndex(i))
                    
                new_time = time.time()
                while (new_time-prevTime.value < interval.value):
                    new_time = time.time()
                powers[count.value] = power
                times[count.value] = new_time-prevTime.value
                count.value += 1
                prevTime.value = new_time
                isrunning.value = 0
        nvmlShutdown()
        
    def init(self):
        self.halt.value = 1
        self.alive.value = 1
        self.process = multiprocessing.Process(target = self._getGpuPower, args = (self.powers, self.times, self.gpu_id,
                self.count, self.halt, self.alive, self.isrunning, self.prevTime, self.interval))
        self.process.start()

    def start(self):  
        self.count.value = 0
        self.prevTime.value = time.time()
        self.halt.value = 0

    def stop(self):
        self.halt.value = 1
        while (self.isrunning.value):
            pass
        return self.powers[:self.count.value], self.times[:self.count.value]
    
    def destroy(self):
        self.alive.value = 0
        self.process.join()
