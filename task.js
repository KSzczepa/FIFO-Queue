const id=0;

class Queue {
	constructor(name) {
		this.name = name;
	}

	fifoHead = null;
	fifoTail = null;
	minIndex = 1;

	

	//Pushing element to the queue from Head side. Modifying localforage.
	async push_head(element) {

		const elementName = this.name + 'Element-';

		await this.id_generator(this.name);

		await localforage.getItem(this.name+'LastIndex').then((index) => {
			
			const itemNextKey = elementName + index + '-Next';
			const itemPrevKey = elementName + index + '-Prev';
			const itemValueKey = elementName + index + '-Value';
			
			//NEXT ELEMENT
			localforage.setItem(itemNextKey, '')  

			//PREV ELEMENT
			localforage.setItem(itemPrevKey, (index > this.minIndex) ? elementName + (index - 1) : '')  

			//VALUE OF ELEMENT
			localforage.setItem(itemValueKey, element)  

			//NEXT ELEMENT VALUE IN PREVIOUS ELEMENT
			if (index > this.minIndex) {
				localforage.getItem(this.name+'Tail').then((recVal) => {					
					localforage.setItem(recVal + '-Next', elementName + index)  
				})
			}

			//HEAD
			if (index === this.minIndex) {
				localforage.setItem(this.name+'Head', this.name + 'Element-' + index)

				this.fifoHead = this.name + 'Element-' + index;
			}

			//TAIL
			localforage.setItem(this.name+'Tail', this.name + 'Element-' + index)

			this.fifoTail = this.name + 'Element-' + index;
		})


	}

	//Modyfying localforage through deleting element from Tail side
	async pop_tail() {
		await localforage.getItem(this.name + 'Tail').then((value) => {
			localforage.getItem(this.name + 'LastIndex').then((index) => {
				if (index > 0) {
					if (index > 1) {
						localforage.getItem(value + '-Prev').then((prevValue) => {							
							localforage.setItem(prevValue + '-Next', '')
						});

						localforage.setItem(this.name+'Tail', this.name + 'Element-' + (index-1))
					}
					
					if (index === 1) {
						localforage.removeItem(this.name+'Tail');
						localforage.removeItem(this.name+'Head');
					}

					localforage.removeItem(value+'-Next');
					localforage.removeItem(value+'-Prev');
					localforage.removeItem(value+'-Value');

					localforage.setItem(this.name + 'LastIndex', index-1)
				}
			});			
		});
	}

	//return the first element from tail side
	tail() {
		
		async function fcn (name) {
			const a = await localforage.getItem(name+'Tail')
			return a;
		};
		fcn(this.name).then((v) => {this.fifoTail = v; console.log('Tail element:', this.fifoTail);});
		
	}

	//return the first element from head side
	head() {
		localforage.getItem(this.name+'Head').then((value) => {console.log('Head element:', value);});
	}

	//generate identifier using by elements
	async id_generator(name) {

		await localforage.getItem(name+'LastIndex').then((receivedValue) => {

			localforage.setItem(name+'LastIndex', receivedValue + 1)
			.then((valueToSet) => {console.log('LastIndex to be set', valueToSet);})    
			.catch((error) => {});

		});
	}
}


const fifo = new Queue("Bob");
// fifo.push_head('My value');
fifo.pop_tail();
fifo.head();

