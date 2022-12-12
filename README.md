# FIFO-Queue
 FiFo Queue using LocalForage memory

testpageSender send some amount of data (10) to the queue. 
testpageReceiver receives this data 1 by 1 from Tail side, validates it and deletes it from the queue if there is no error. 

To this task 2 libraries were used:
- localforage
- seedrandom
