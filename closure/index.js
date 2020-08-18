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

		// 怪兽位置
		const monsterPos = new Map();

		function inheritClass(subClass, superClass) {
			subClass.prototype = Object.create(superClass.prototype, {
				constructor: {
					value: subClass,
					writable: true
				}
			})
			return subClass
		}

		/**
		 * 有draw方法的基类
		 */
		function Everything(options) {
			// 图片
			this.img = options.img;
			// 画笔环境
			this.context = options.context;
			// 图片渲染位置
			this.imgPos = options.imgPos;
			// 画图位置
			this.rect = options.rect;
		}
		Everything.prototype.draw = function () {
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

		function Wall() {
			const options = {
				img: allSpriteImg,
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
					width: 32,
					height: 32
				}
			}
			Everything.call(this, options);
		}
		inheritClass(Wall, Everything);
		Wall.prototype.drawMap = function() {
			for (let i = 0 ; i < 20; i ++) {
				for (let j = 0 ; j < 10; j ++) {
					this.rect.x = i * 32
					this.rect.y = j * 32
					this.draw()
				}
			}
		}

		/**
		 * @param {Object} options
		 * 人物类 有血量和攻击力
		 */
		function Person(options) {
			Everything.call(this, options);
			this.bloodVolume = options.bloodVolume || 1;
			this.attackVolume = options.attackVolume || 1;
		}
		inheritClass(Person, Everything);
		Person.prototype.attack = function(target) {
			this.bloodVolume -= target.attackVolume;
			target.bloodVolume -= this.attackVolume;
		}
		const originDraw = Everything.prototype.draw;
		Person.prototype.draw = function() {
			originDraw.call(this);
			this.context.fillStyle = 'white';
			this.context
				.fillText(`blood:${this.bloodVolume} atk:${this.attackVolume}`, this.rect.x, this.rect.y)
		}

		let monsterId = 1;
		function Monster() {
			const options = {
				img: allSpriteImg,
				context: context,
				imgPos: {
					x: 858,
					y: 530,
					width: 32,
					height: 32
				},
				rect: {
					x: 64,
					y: 64,
					width: 32,
					height: 32
				},
				bloodVolume: 100,
				attackVolume: 10
			}
			Person.call(this, options);
			this.monsterId = monsterId++;
		}
		// Monster继承人物
		inheritClass(Monster, Person);

		const originPersonDraw = Person.prototype.draw;
		Monster.prototype.draw = function() {
			if (this.bloodVolume <= 0 ) {
				// 死亡
				monsterPos.delete(this.monsterId);
				return
			}
			originPersonDraw.call(this);
			monsterPos.set(this.monsterId, [this.rect.x, this.rect.y, this])
		}
		
		function RedMonster() {
			Monster.call(this)
			this.imgPos = {
				x: 858,
				y: 498,
				width: 32,
				height: 32
			};
			this.rect = {
				x: 128,
				y: 128,
				width: 32,
				height: 32
			};
			this.bloodVolume = 120;
			this.attackVolume = 12;
		}
		// 红色变异Monster继承Monster
		inheritClass(RedMonster, Monster)

		function Hero() {
			const options = {
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
					width: 32,
					height: 32
				},
				bloodVolume: 300,
				attackVolume: 8
			}
			Person.call(this, options);
		}
		inheritClass(Hero, Person);
		Hero.prototype.listenMove = function () {
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
				const newx = rect.x + pos[0] * rect.width
				const newy = rect.y + pos[1] * rect.height
				// 超出区域
				if (newx < 0 || newx > 500 || newy < 0 || newy > 300) {
					return
				}
				// 发生战斗
				for (const monster of monsterPos) {
					const pos = monster[1]
					if (pos[0] === newx && pos[1] === newy) {
						// 发生碰撞
						target.attack(pos[2]);
						refreshMap()
						return
					}
				}
				target.context.clearRect(rect.x, rect.y, rect.width, rect.height)
				rect.x = newx
				rect.y = newy
				refreshMap()
			})
		}
		Hero.prototype.draw = function() {
			if (this.bloodVolume <= 0) {
				// 死亡
				alert('您已死亡')
				return
			}
			originPersonDraw.call(this)
		} 

		var wall = new Wall();
		var hero = new Hero();
		var monster = new Monster();
		var redMonster = new RedMonster();

		function refreshMap() {
			wall.drawMap();
			hero.draw();
			monster.draw();
			redMonster.draw();
		}

		hero.listenMove();
		refreshMap();
	}

	var resourceManager = prepare();
	resourceManager.getResource(function (context, heroImg, allSpriteImg) {
		drawHero(context, heroImg, allSpriteImg);
	});



})();