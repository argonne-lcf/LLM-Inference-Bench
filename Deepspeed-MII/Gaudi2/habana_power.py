import multiprocessing
import os
import time
import pyhlml
import subprocess

class habanaPowerProbe(object):
    def __init__(self, interval, all_hpu=True):
        self.interval = multiprocessing.Value('d', interval)
        self.len = int(7200/interval)
        self.powers = multiprocessing.Array('d', self.len)
        self.times = multiprocessing.Array('d', self.len)
        if all_hpu:
            self.n_hpu = multiprocessing.Value('i', -1)
            self.habana_id = multiprocessing.Array('i', 1)
        else:
            pid = str(os.getpid())
            hpus = subprocess.check_output("hl-smi | grep " + pid + " | awk '{printf \"%d \" ,$2}'", encoding='utf-8' , shell=True).split()
            if len(hpus) == 0:
                print('\33[31m' + 'Warning: No active hpu! Press any key to continue...' + '\033[0m')
            self.n_hpu = multiprocessing.Value('i', len(hpus))
            self.habana_id = multiprocessing.Array('i', len(hpus))
            for i in range(len(hpus)):
                self.habana_id[i] = int(hpus[i])
        self.process = None
        self.prevTime = multiprocessing.Value('d',time.time())
        self.halt = multiprocessing.Value('i',1)   
        self.count = multiprocessing.Value('i',0)
        self.isrunning = multiprocessing.Value('i',0)
        self.alive = multiprocessing.Value('i',0) 
        self.init()

    def _getHabanaPower(self, powers, times, habana_id, n_hpu, count, halt, alive, isrunning, prevTime, interval):
        pyhlml.hlmlInit()
        while (alive.value):
            while (not halt.value):
                isrunning.value = 1
                power = 0
                if n_hpu.value > 0:
                    for i in range(n_hpu.value):
                        power += pyhlml.hlmlDeviceGetPowerUsage(pyhlml.hlmlDeviceGetHandleByIndex(habana_id[i]))
                elif n_hpu.value < 0:
                    num_gaudis = pyhlml.hlmlDeviceGetCount()
                    for i in range(num_gaudis):
                        power += pyhlml.hlmlDeviceGetPowerUsage(pyhlml.hlmlDeviceGetHandleByIndex(i))

                new_time = time.time()
                while (new_time-prevTime.value < interval.value):
                    new_time = time.time()
                powers[count.value] = power
                times[count.value] = new_time-prevTime.value
                count.value += 1
                prevTime.value = new_time
                isrunning.value = 0
        pyhlml.hlmlShutdown()

    def init(self):
        self.halt.value = 1
        self.alive.value = 1
        self.process = multiprocessing.Process(target = self._getHabanaPower, args = (self.powers, self.times, self.habana_id,
                self.n_hpu, self.count, self.halt, self.alive, self.isrunning, self.prevTime, self.interval))
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
