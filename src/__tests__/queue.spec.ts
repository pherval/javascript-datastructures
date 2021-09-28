import Queue, { QueueUnderflow } from "queue";

describe("Queue", () => {
	let queue: Queue<number>;

	beforeEach(() => {
		queue = new Queue();
	});

	describe("Queue creation", () => {
		describe("With Argument", () => {
			it("Create successfuly with 1 argument", () => {
				const queue = new Queue(10);
				expect(queue).toHaveLength(1);
			});

			it("Create successfuly with 2 items", () => {
				const queue = new Queue(10, 20);
				expect(queue).toHaveLength(2);
			});

			it("Create successfuly with multiple items", () => {
				const queue = new Queue(...[1, 2, 3, 4]);
				expect(queue).toHaveLength(4);
			});
		});

		describe("Without Argument", () => {
			it("creates empty queue", () => {
				const queue = new Queue();
				expect(queue).toHaveLength(0);
			});
		});
	});

	describe("Methods", () => {
		describe("Iterating", () => {
			it("Gives the order of insertion", () => {
				const elements = [1, 2, 3];
				const queue = new Queue();
				queue.insert(...elements);
				expect([...queue]).toEqual(elements);
			});
		});

		describe(".insert", () => {
			let queue: Queue<unknown>;
			beforeEach(() => (queue = new Queue()));

			describe("With single item", () => {
				it("Enqueue item sucessfully", () => {
					queue.insert(1);
					expect([...queue]).toEqual([1]);
				});

				it("Enqueues ordered by insertion time", () => {
					queue.insert(1);
					queue.insert(2);
					queue.insert(3);

					expect([...queue]).toEqual([1, 2, 3]);
				});

				it("Increase size by the number of insertions", () => {
					queue.insert(1);
					queue.insert(2);
					queue.insert(3);
					queue.insert(4);

					expect(queue).toHaveLength(4);
				});
			});

			describe("With multiple arguments", () => {
				it("insert items by order of argument", () => {
					const items = [1, 2, 3, 4];

					queue.insert(...items);
					expect([...queue]).toEqual(items);
				});

				it("Augment the queue length by quantity of arguments", () => {
					queue.insert(1, 2, 3, 4);
					expect(queue).toHaveLength(4);
				});

				it("Insert items at the rear", () => {
					const items = [1, 2, 3, 4];
					queue.insert(10);
					queue.insert(20);
					queue.insert(...items);

					expect([...queue]).toEqual([10, 20, ...items]);
				});

				it("Enqueue successfuly n elements", () => {
					queue.insert(1, 2, 3, 4);
					expect([...queue]).toEqual([1, 2, 3, 4]);
				});
			});
		});

		describe(".remove", () => {
			it("Dequeuing empty queue throws QueueUnderflow", () => {
				expect(() => queue.remove()).toThrow(QueueUnderflow);
			});

			it("Returns first item inserted", () => {
				queue.insert(1, 2, 3);
				expect(queue.remove()).toBe(1);
			});

			it("Decrease size by 1", () => {
				queue.insert(1, 2, 3);
				queue.remove();
				expect(queue).toHaveLength(2);
			});

			it("Gets empty queue when theres only one queued element", () => {
				queue.insert(1);
				queue.remove();
				expect(queue.empty()).toBe(true);
			});

			it("Remove last item", () => {
				queue.insert(1);
				queue.remove();
				expect([...queue]).toEqual([]);
			});
		});

		describe(".empty", () => {
			it("Returns true after insert item", () => {
				const queue = new Queue();
				queue.insert(1);
				expect(queue.empty()).toBe(false);
			});

			it("Returns false for recent created queue", () => {
				const queue = new Queue();
				expect(queue.empty()).toBe(true);
			});

			it("Returns true after dequeue last item", () => {
				const queue = new Queue(10);
				queue.remove();

				expect(queue.empty()).toBe(true);
			});

			it("Returns false after dequeue and left with more than element", () => {
				const queue = new Queue(10, 20);

				queue.remove();
				expect(queue.empty()).toBe(false);
			});

			it("Returns false when constructing with single element", () => {
				const queue = new Queue(10);
				expect(queue.empty()).toBe(false);
			});

			it("Returns false when constructing with more than 1 element", () => {
				const queue = new Queue(1, 2, 3);
				expect(queue.empty()).toBe(false);
			});
		});

		describe(".size", () => {
			it("Returns 0 for new queue", () => {
				const queue = new Queue();
				expect(queue.size()).toBe(0);
			});

			it("Returns queued number of items", () => {
				const queue = new Queue(1, 2, 3, 4);
				expect(queue.size()).toBe(4);
			});
		});

		describe(".clear", () => {
			it("Modify size equals 0", () => {
				queue.insert(1, 2, 3, 4);
				queue.clear();

				expect(queue).toHaveLength(0);
			});

			it("Remove all items", () => {
				queue.insert(1, 2, 3, 4);
				queue.clear();
				expect([...queue]).toEqual([]);
			});

			it("Keeps the queue empty", () => {
				const queue = new Queue();
				queue.clear();

				expect(queue).toHaveLength(0);
			});
		});
	});
});
