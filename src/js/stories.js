document.addEventListener("DOMContentLoaded", function () {
	/*slider*/
	let sliderLine = document.querySelector('.stories-slider-line');
	let slider = document.querySelector('.stories-slider-wrapper');
	let slides = document.querySelectorAll('.stories-slider-slide');
	let sliderCount = 0;
	let sliderInitWidth;
	let calcWidth = 0;
	let sliderLineTrueWidth;
	if(sliderLine){
		function init() {
			sliderInitWidth = document.getElementById('stories-slider-wrapper').offsetWidth;
			sliderLineTrueWidth = slides[0].offsetWidth * slides.length;
		}

		init();

		document.querySelector('.control-icon-right').addEventListener("click", function() {
			if (calcWidth < sliderLineTrueWidth) {
				sliderCount++;
				rollSlider();
				document.querySelector('.control-icon-left').classList.remove('hide');
			}

			calcWidth = (slides[0].offsetWidth * (sliderCount + 1) ) + sliderInitWidth;

			if(calcWidth >= sliderLineTrueWidth){
				document.querySelector('.control-icon-right').classList.add('hide')
			}
		})
		document.querySelector('.control-icon-left').addEventListener("click", function() {
			if (sliderCount > 0) {
				sliderCount--;
				rollSlider();
				document.querySelector('.control-icon-right').classList.remove('hide');
			}

			if(sliderCount <= 0)
				document.querySelector('.control-icon-left').classList.add('hide');
		})

		function rollSlider() {
			sliderLine.style.transform = 'translate(-' + slides[0].offsetWidth * sliderCount + 'px)';
		}
		/*stories*/
		let sliderLineF = document.querySelector('.stories-slider-line-full'), 
			slidesF = document.querySelectorAll('.stories-slider-full-slide img'),
			sliderCountF = 0, 
			progressBar = document.querySelector('.progress-bar'),
			isCurStoryHasChilds,
			contentItemsCount, 
			currentStoryContents, 
			innerStoryCounter = 0, 
			slidesLengthF = document.querySelectorAll('.stories-slider-full-slide').length, 
			currentTimeout,
			timeForOneStory = 3000, 
			progressInterval,
			progressWidth = 0,
			storyButton = document.querySelector('.full-slide-button');

		document.querySelector('.stories-navigation-right').addEventListener("click", function() {
			if (!isCurStoryHasChilds) {
				nextStory();
			} else {
				nextInnerSlide();
			}
		});

		document.querySelector('.stories-navigation-left').addEventListener("click", function() {
			if (!isCurStoryHasChilds) {
				prevStory();
			} else {
				prevInnerSlide();
			}
		});

		let lock, direction;

		document.querySelector('.stories-navigation').addEventListener('mousedown', (e) => {
			lock = true;

			e.target.parentElement.addEventListener('mouseup', () => {
				lock = false;
			})
			e.target.parentElement.addEventListener('mouseleave', () => {
				lock = false;
			})

			e.target.parentElement.addEventListener('mousemove', (e) => {
				if (e.movementX < 0) {
					direction = 'left';
				} else {
					direction = 'right';
				}

				if (lock) {
					switch (direction) {
						case 'left':
							nextInnerSlide(); 
							break;
						case 'right':
							prevInnerSlide(); 
							break;
					}
				}

				lock = false;
			})
		});

		let touchstartX = 0
		let touchendX = 0

		const storiesNav = document.querySelector('.stories-navigation');

		function handleGesture() {
			if (touchendX < touchstartX) nextInnerSlide();
			if (touchendX > touchstartX) prevInnerSlide();
		}

		storiesNav.addEventListener('touchstart', e => {
			touchstartX = e.changedTouches[0].screenX
		})

		storiesNav.addEventListener('touchend', e => {
			touchendX = e.changedTouches[0].screenX
			handleGesture()
		});

		document.querySelector('.close-stories').addEventListener("click", function() {
			closeStories();
		})

		document.querySelectorAll('.stories-slider-slide').forEach((slide, key) => { 
			slide.addEventListener("click", function() {
				document.querySelectorAll('.stories-slider-full-slide').forEach((story) => {
					if (story.getAttribute('data-id') == slide.getAttribute('data-id')) {
						document.querySelector('.stories-wrapper').classList.remove('hide') //show stories
						sliderLineF.style.transform = 'translate(-' + story.offsetLeft + 'px)'; 
						sliderCountF = key; //set count to count position of current story
						generateStory();
					}
					if (story.querySelector('.full-slide-content').childElementCount > 1) { 
						let childrens = story.querySelectorAll('.full-slide-content-item');
						childrens.forEach((el, key) => {
							if (key > 0)
								el.classList.add('hide')
							else {
								el.classList.remove('hide')
							}
						})
					}

					story.addEventListener('mousemove', function(e) {
						console.log(e)
					})
				})
			})
		})

		function closeStories() {
			document.querySelector('.stories-wrapper').classList.add('hide')
			innerStoryCounter = 0;
			sliderCountF = 0;
			clearTimeout(currentTimeout);
			clearInterval(progressInterval);
		}

		function rollStory() {
			generateStory();
			sliderLineF.style.transform = 'translate(-' + slidesF[0].offsetWidth * sliderCountF + 'px)';
		}

		function nextStory() {
			if (sliderCountF < slidesLengthF - 1) { 
				sliderCountF++;
				rollStory();
			} else {
				closeStories();
			}
		}

		function prevStory() {
			if (sliderCountF > 0) { 
				sliderCountF--;
				rollStory();
			} else {
				closeStories();
			}
		}

		function nextInnerSlide() {
			let contents = currentStoryContents.querySelectorAll('.full-slide-content-item');

			if (!isCurStoryHasChilds) {
				nextStory();
			} else {
				contents.forEach(function(el, key) {
					if (key == 0) {
						if (contentItemsCount > 2) { 
							if (innerStoryCounter + 1 < contentItemsCount) { 
								contents[innerStoryCounter].classList.add('hide') 
								contents[innerStoryCounter + 1].classList.remove('hide') 
			
								setStoryDuration(contents[innerStoryCounter + 1]);
							} else { 
								contents[0].classList.remove('hide')
								contents[contentItemsCount - 1].classList.add('hide')
			
							}
						} else { 
							if (innerStoryCounter < contentItemsCount) { 
								if (innerStoryCounter == 0) {
									contents[innerStoryCounter].classList.add('hide')
									contents[innerStoryCounter + 1].classList.remove('hide')
									setStoryDuration(contents[innerStoryCounter]);
								} else {
									contents[innerStoryCounter - 1].classList.remove('hide')
									contents[contentItemsCount - 1].classList.add('hide')
								}
			
							} else { 
								contents[0].classList.remove('hide') 
								contents[contentItemsCount - 1].classList.add('hide') 
							}
						}
					}
				})
			
				innerStoryCounter++;
			
				if (contentItemsCount > 2) { 
					if (innerStoryCounter >= contentItemsCount) {
						nextStory();
					}
				} else { 
					if (innerStoryCounter >= contentItemsCount) {
						nextStory();
					}
				}
			
				if (contents[innerStoryCounter].tagName != "VIDEO") {
					timeForOneStory = 3000;
				}
			
				if (innerStoryCounter > 0) {
					document.querySelectorAll('.progress-bar-item').forEach((el, key) => {
						if (key < innerStoryCounter) {
							el.style.setProperty('--progress-bar-width', 100 + '%')
						}
					});
			
					clearTimeout(currentTimeout)
					clearInterval(progressInterval);
					startTimeout();
				}
			
				showStoriesButton(contents[innerStoryCounter]);
				setStoriesBg(contents[innerStoryCounter]);
			}

			
		}

		function prevInnerSlide() {
			let contents = currentStoryContents.querySelectorAll('.full-slide-content-item');

			if (!isCurStoryHasChilds) {
				prevStory();
			} else {
				contents.forEach(function(el) {
					if (!el.classList.contains('hide')) {
						if (contentItemsCount > 2) { 
							if (innerStoryCounter - 1 > 0) {
								contents[innerStoryCounter].classList.add('hide') 
								contents[innerStoryCounter - 1].classList.remove('hide') 
							} else { 
								contents[0].classList.remove('hide')
								contents[contentItemsCount - 1].classList.add('hide')
							}
						} else {
							if (innerStoryCounter < contentItemsCount) { 
								contents[1].classList.add('hide')
								contents[0].classList.remove('hide')
								setStoryDuration(contents[innerStoryCounter]);
							}
						}
					}
				})

				if (innerStoryCounter <= 0) {
					prevStory();
				}

				if (innerStoryCounter > 0)
					innerStoryCounter--;

				document.querySelectorAll('.progress-bar-item').forEach((el, key) => {
					if (key > innerStoryCounter) {
						el.style.setProperty('--progress-bar-width', 0 + '%')
					}
				})

				clearTimeout(currentTimeout);
				clearInterval(progressInterval);
				startTimeout();

				showStoriesButton(contents[innerStoryCounter]);
				setStoriesBg(contents[innerStoryCounter]);
			}
		}

		function refreshStoriesBars() {
			let currentStory = document.querySelectorAll('.stories-slider-full-slide')[sliderCountF];
			currentStoryContents = currentStory.querySelector('.full-slide-content');
			contentItemsCount = currentStoryContents.childElementCount;
			progressBar.innerHTML = '';

			for (i = 0; i < contentItemsCount; i++) {
				progressBar.appendChild(document.createElement('div')).className = 'progress-bar-item';
			}
		}

		function generateStory() {

			refreshStoriesBars();
			let curContentsFirst = currentStoryContents.querySelectorAll('.full-slide-content-item')[0];
			innerStoryCounter = 0;
			setStoryDuration(curContentsFirst);
			if (contentItemsCount > 1)
				isCurStoryHasChilds = true;
			else
				isCurStoryHasChilds = false;

			if (currentTimeout) {
				clearTimeout(currentTimeout)
				clearInterval(progressInterval)
			}

			startTimeout();

			setTimeout(function() {
				showStoriesButton(curContentsFirst);
			}, 0)

			setStoriesBg(curContentsFirst);
		}

		function startTimeout() {
			progressWidth = 0;

			currentTimeout = setTimeout(function() {
				if (!isCurStoryHasChilds)
					nextStory();
				else
					nextInnerSlide();

			}, timeForOneStory);

			document.querySelectorAll('.progress-bar-item').forEach((el, key) => {
				if (key == innerStoryCounter) {
					progressInterval = setInterval(function() {
						progressWidth++;

						el.style.setProperty('--progress-bar-width', progressWidth + '%')
					}, timeForOneStory / 100)
				}
			})
		}

		function setStoryDuration(el) {
			if (el.tagName == 'VIDEO') {
				timeForOneStory = el.duration * 1000 
			}
		}

		function showStoriesButton(el) {
			if (el.getAttribute('data-btn-text')) {
				storyButton.innerHTML = el.getAttribute('data-btn-text');
				storyButton.setAttribute('href', el.getAttribute('data-btn-href'))
				storyButton.classList.remove('hide')
			} else {
				storyButton.classList.add('hide')
			}
		}

		function setStoriesBg(el) {
			let img = el.getAttribute('src');

			if (img)
				document.querySelector('.stories-wrapper').style.backgroundImage = `url(${img})`;
		}
	}
});