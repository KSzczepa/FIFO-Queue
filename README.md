# FIFO-Queue
 FiFo Queue using LocalForage memory

testpageSender send some amount of data (10) to the queue. 
testpageReceiver receives those data 1 by 1 from Tail side, validates them and deletes them from the queue if there is no error. 

To this task 2 libraries were used:
- localforage
- seedrandom
