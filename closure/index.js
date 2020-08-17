/**
 * yuanxin
 */

(function () {
	// 我是汪洋老师
	function prepare() {

		const imgTask = (img, src) => {
			return new Promise(function (resolve, reject) {
				img.onload = resolve;
				img.onerror = reject;
				img.src = src;
			});
		};

		const context = document.getElementById('content').getContext('2d');
		const heroImg = new Image();
		const allSpriteImg = new Image();

		const allresourceTask = Promise.all([
			imgTask(heroImg, './hero.png'),
			imgTask(allSpriteImg, './all.jpg'),
		]);

		return {
			/**
			 * @param {Function} [callback] - 当准备好了之后要调用的回掉函数
			 */
			getResource(callback) {
				allresourceTask.then(function () {
					callback && callback(context, heroImg, allSpriteImg);
				});
			}
		};
	}


	// 我是袁鑫老师
	function drawHero(context, heroImg, allSpriteImg) {

		var draw = function () {
			this.context
				.drawImage(
					this.img,
					this.imgPos.x,
					this.imgPos.y,
					this.imgPos.width,
					this.imgPos.height,
					this.rect.x,
					this.rect.y,
					this.rect.width,
					this.rect.height
				);
		}

		function listenMove() {
			const poses = {
				38: [0, -1],
				40: [0, 1],
				37: [-1, 0],
				39: [1, 0]
			}
			const target = this;
			window.addEventListener('keyup', function(e) {
				const pos = poses[e.keyCode]
				if (!pos) return
				const rect = target.rect
				target.context.clearRect(rect.x, rect.y, rect.width, rect.height)
				rect.x += pos[0] * rect.width
				rect.y += pos[1] * rect.height
				target.draw()
			})
		}

		var hero = {
			img: heroImg,
			context: context,
			imgPos: {
				x: 0,
				y: 0,
				width: 32,
				height: 32
			},

			rect: {
				x: 0,
				y: 0,
				width: 40,
				height: 40
			},

			draw: draw,
			listenMove: listenMove
		};

		var monster = {
			img: allSpriteImg,
			context: context,
			imgPos: {
				x: 858,
				y: 529,
				width: 32,
				height: 32
			},

			rect: {
				x: 100,
				y: 100,
				width: 40,
				height: 40
			},

			draw: draw
		};

		hero.draw();
		monster.draw();
		hero.listenMove()
	}

	var resourceManager = prepare();
	resourceManager.getResource(function (context, heroImg, allSpriteImg) {
		drawHero(context, heroImg, allSpriteImg);
	});



})();