const id=0;

class Queue {
	constructor(name) {
		this.name = name;
	}

	fifoHead = null;
	fifoTail = null;

	create() {
		localforage.getItem(this.name).then((value) => {
			console.log(value)
		});

		if (typeof(localforage.getItem(this.name)) == 'undefined') {
			//queue dos not exist
			localforage.setItem(this.name, 0);
			return false;
		}
		else	
			return true;
	}

	//Pushing element to the queue from Head side. Modifying localforage.
	push_head(element) {

		const elementName = this.name + 'Element-';

		this.id_generator(this.name);

		localforage.getItem(this.name+'LastIndex').then((index) => {
			if (index == null) 
			index = 0;

			const itemNextKey = elementName + index + '-Next';
			const itemPrevKey = elementName + index + '-Prev';
			const itemValueKey = elementName + index + '-Value';
			
			//NEXT ELEMENT
			localforage.setItem(itemNextKey, '')  
			.catch((error) => {console.log(error);});

			//PREV ELEMENT
			localforage.setItem(itemPrevKey, (index > 0) ? elementName + (index - 1) : '')  
			.catch((error) => {console.log(error);});

			//VALUE OF ELEMENT
			localforage.setItem(itemValueKey, element)  
			.catch((error) => {console.log(error);});

			//NEXT ELEMENT VALUE IN PREVIOUS ELEMENT
			if (index > 0) {
				localforage.getItem(this.name+'Tail').then((recVal) => {
					
					localforage.setItem(recVal + '-Next', elementName + index)  
					.catch((error) => {console.log(error);});
				})
			}

			//HEAD
			if (index === 0) {
				localforage.setItem(this.name+'Head', this.name + 'Element-' + index)
				.catch((error) => {});

				this.fifoHead = this.name + 'Element-' + index;
			}

			//TAIL
			localforage.setItem(this.name+'Tail', this.name + 'Element-' + index)
			.catch((error) => {});

			this.fifoTail = this.name + 'Element-' + index;
		})


	}

	//Modyfying localforage through deleting element from Tail side
	pop_tail() {

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
		return this.fifoHead;
	}

	//generate identifier using by elements
	id_generator(name) {

		localforage.getItem(name+'LastIndex').then((receivedValue) => {

			localforage.setItem(name+'LastIndex', receivedValue + 1)
			.then((valueToSet) => {console.log('LastIndex to be set', valueToSet);})    
			.catch((error) => {});

		});
		
		  
	}
}


const fifo = new Queue("Bob");
fifo.push_head('My value');
fifo.tail();
