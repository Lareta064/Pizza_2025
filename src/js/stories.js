document.addEventListener("DOMContentLoaded", function () {
	/*slider*/
	let sliderLine = document.querySelector('.stories-slider-line');
	let slider = document.querySelector('.stories-slider-wrapper');
	let slides = document.querySelectorAll('.stories-slider-slide');
	let sliderCount = 0;
	let sliderInitWidth;
	let calcWidth = 0;
	let sliderLineTrueWidth;

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
	let sliderLineF = document.querySelector('.stories-slider-line-full'), //РїСЂРёРїРёСЃРєР° F РІ РєРѕРЅС†Рµ РЅР°Р·РІР°РЅРёСЏ - С‡С‚Рѕ Р±С‹ РЅРµ РєРѕРЅС„Р»РёРєС‚РѕРІР°Р»Рё РјРµР¶РґСѓ СЃРѕР±РѕР№ slider.js Рё stories.js
		slidesF = document.querySelectorAll('.stories-slider-full-slide img'),
		sliderCountF = 0, //РїРµСЂРµРјРµРЅРЅР°СЏ РЅСѓР¶РЅР°СЏ РґР»СЏ РїРµСЂРµРјРµС‰РµРЅРёСЏ РјРµР¶РґСѓ РёСЃС‚РѕСЂРёСЏРјРё
		progressBar = document.querySelector('.progress-bar'),
		isCurStoryHasChilds,
		contentItemsCount, //РєРѕР»-РІРѕ РІРЅСѓС‚СЂРµРЅРЅРёС… СЃР»Р°Р№РґРѕРІ Сѓ РёСЃС‚РѕСЂРёРё
		currentStoryContents, //РєРѕРЅС‚РµРЅС‚ С‚РµРєСѓС‰РµР№ РёСЃС‚РѕСЂРёРё
		innerStoryCounter = 0, //РїРµСЂРµРјРµРЅРЅР°СЏ РЅСѓР¶РЅР°СЏ РґР»СЏ РїРµСЂРµРјРµС‰РµРЅРёСЏ РјРµР¶РґСѓ СЃР»Р°Р№РґР°РјРё
		slidesLengthF = document.querySelectorAll('.stories-slider-full-slide').length, //РєРѕР»-РІРѕ РІСЃРµС… СЃР»Р°Р№РґРѕРІ
		currentTimeout,
		timeForOneStory = 3000, //РІСЂРµРјСЏ (РІ РјРёР»РёСЃРµРєСѓРЅРґР°С…) РѕС‚РІРµРґРµРЅРЅРѕРµ РЅР° РїРѕРєР°Р· РѕРґРЅРѕРіРѕ СЃР»Р°Р№РґР° РёСЃС‚РѕСЂРёРё(РєР°СЂС‚РёРЅРєРё)
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
						nextInnerSlide(); //СЃРјРµРЅРёР» nextStory РЅР° nextInnerSLide
						break;
					case 'right':
						prevInnerSlide(); //Р°РЅР°Р»РѕРіРёС‡РЅРѕ С‚РѕР»СЊРєРѕ СЃ prevInnerSLide
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

	document.querySelectorAll('.stories-slider-slide').forEach((slide, key) => { //РїРѕРєР°Р·Р°С‚СЊ РёСЃС‚РѕСЂРёРё
		slide.addEventListener("click", function() {
			document.querySelectorAll('.stories-slider-full-slide').forEach((story) => {
				if (story.getAttribute('data-id') == slide.getAttribute('data-id')) {
					document.querySelector('.stories-wrapper').classList.remove('hide') //show stories
					sliderLineF.style.transform = 'translate(-' + story.offsetLeft + 'px)'; //transform to current story
					sliderCountF = key; //set count to count position of current story
					generateStory();
				}
				if (story.querySelector('.full-slide-content').childElementCount > 1) { //РІРѕ РІСЃРµС… РёСЃС‚РѕСЂРёСЏС…, СЃРєСЂС‹РІР°С‚СЊ РІСЃРµ СЌР»РµРјРµРЅС‚С‹, РєСЂРѕРјРµ РїРµСЂРІС‹С…
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
		if (sliderCountF < slidesLengthF - 1) { //РЅРµ РїС‹С‚Р°РµС‚СЊСЃСЏ Р»Рё СЃР»Р°Р№РґРµСЂ РёСЃС‚РѕСЂРёР№ РїРµСЂРµР№С‚Рё РјР°РєСЃРёРјР°Р»СЊРЅРѕРµ РєРѕР»РёС‡РµСЃС‚РІРѕ СЃР»Р°Р№РґРѕРІ
			sliderCountF++;
			rollStory();
		} else {
			closeStories();
		}
	}

	function prevStory() {
		if (sliderCountF > 0) { //РЅРµ РїС‹С‚Р°РµС‚СЊСЃСЏ Р»Рё СЃР»Р°Р№РґРµСЂ РёСЃС‚РѕСЂРёР№ РїРµСЂРµР№С‚Рё РјРёРЅРёРјР°Р»СЊРЅРѕРµ РєРѕР»РёС‡РµСЃС‚РІРѕ СЃР»Р°Р№РґРѕРІ
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
					if (contentItemsCount > 2) { //РµСЃР»Рё РєРѕР»-РІРѕ РІРЅСѓС‚СЂРµРЅРЅРёС… СЃР»Р°Р№РґРѕРІ Р±РѕР»СЊС€Рµ С‡РµРј 2
						if (innerStoryCounter + 1 < contentItemsCount) { //РјРµРЅСЊС€Рµ Р»Рё counter РєРѕС‚РѕСЂС‹Р№ СѓС‡РёС‚С‹РІР°РµС‚ СЃР»РµРґСѓСЋС‰РёР№ СЌР»РµРјРµРЅС‚, С‡РµРј РєРѕР»РёС‡РµСЃС‚РІРѕ СЌС‚РёС… СЌР»РµРјРµРЅС‚РѕРІ
							contents[innerStoryCounter].classList.add('hide') //СЃРєСЂС‹РІР°С‚СЊ С‚РµРєСѓС‰РёР№ 
							contents[innerStoryCounter + 1].classList.remove('hide') //РїРѕРєР°Р·С‹РІР°С‚СЊ СЃР»РµРґСѓСЋС‰РёР№
		
							setStoryDuration(contents[innerStoryCounter + 1]);
						} else { //РµСЃР»Рё Р±РѕР»СЊС€Рµ, СѓР±РёСЂР°РµС‚СЃСЏ СЃРєСЂС‹С‚РёРµ РїРµСЂРІРѕРіРѕ СЌР»РµРјРµРЅС‚Р°, Рё СЃРєСЂС‹РІР°РµС‚СЃСЏ РїРѕСЃР»РµРґРЅРёР№ (РЅСѓР¶РЅРѕ РґР»СЏ С‚РѕРіРѕ С‡С‚Рѕ Р±С‹ РїСЂРё РїРµСЂРµРєР»СЋС‡РµРЅРёРё РЅР° СЃР»РµРґСѓСЋС‰СѓСЋ РёСЃС‚РѕСЂРёСЋ, СЃР»Р°Р№РґРµСЂ РЅРµ "РїРµСЂРµРїСЂС‹РіРёРІР°Р»" С‡РµСЂРµР· СЌС‚РѕС‚ СЌР»РµРјРµРЅС‚)
							contents[0].classList.remove('hide')
							contents[contentItemsCount - 1].classList.add('hide')
		
						}
					} else { //РµСЃР»Рё РєРѕР»-РІРѕ РІРЅСѓС‚СЂРµРЅРЅРёС… СЃР»Р°Р№РґРѕРІ СЂР°РІРЅРѕ 2
						if (innerStoryCounter < contentItemsCount) { //РµСЃР»Рё counter РјРµРЅСЊС€Рµ С‡РµРј РєРѕР»РёС‡РµСЃС‚РІРѕ РІРЅСѓС‚СЂРµРЅРЅРёС… СЌР»РµРјРµРЅС‚РѕРІ РёСЃС‚РѕСЂРёРё
							if (innerStoryCounter == 0) { //РµСЃР»Рё counter РЅР°С‡РёРЅР°РµС‚СЃСЏ СЃ РЅСѓР»СЏ(РѕР±С‹С‡РЅРѕ РїСЂРё РѕС‚РєСЂС‹С‚РёРё РёСЃС‚РѕСЂРёРё)
								contents[innerStoryCounter].classList.add('hide')
								contents[innerStoryCounter + 1].classList.remove('hide')
								setStoryDuration(contents[innerStoryCounter]);
							} else {
								contents[innerStoryCounter - 1].classList.remove('hide')
								contents[contentItemsCount - 1].classList.add('hide')
							}
		
						} else { //РµСЃР»Рё Р±РѕР»СЊС€Рµ
							contents[0].classList.remove('hide') //РїРѕРєР°Р·С‹РІР°С‚СЊ РїРµСЂРІС‹Р№
							contents[contentItemsCount - 1].classList.add('hide') //СЃРєСЂС‹РІР°С‚СЊ РїРѕСЃР»РµРґРЅРёР№
						}
					}
				}
			})
		
			innerStoryCounter++;
		
			if (contentItemsCount > 2) { //РµСЃР»Рё РєРѕР»-РІРѕ РІРЅСѓС‚СЂРµРЅРЅРёС… СЃР»Р°Р№РґРѕРІ Р±РѕР»СЊС€Рµ С‡РµРј 2
				if (innerStoryCounter >= contentItemsCount) {
					nextStory();
				}
			} else { //РµСЃР»Рё РєРѕР»-РІРѕ РІРЅСѓС‚СЂРµРЅРЅРёС… СЃР»Р°Р№РґРѕРІ СЂР°РІРЅРѕ 2
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
					if (contentItemsCount > 2) { //РµСЃР»Рё РєРѕР»-РІРѕ РІРЅСѓС‚СЂРµРЅРЅРёС… СЃР»Р°Р№РґРѕРІ Р±РѕР»СЊС€Рµ С‡РµРј 2
						if (innerStoryCounter - 1 > 0) { //РјРµРЅСЊС€Рµ Р»Рё counter РєРѕС‚РѕСЂС‹Р№ СѓС‡РёС‚С‹РІР°РµС‚ СЃР»РµРґСѓСЋС‰РёР№ СЌР»РµРјРµРЅС‚, С‡РµРј РєРѕР»РёС‡РµСЃС‚РІРѕ СЌС‚РёС… СЌР»РµРјРµРЅС‚РѕРІ
							contents[innerStoryCounter].classList.add('hide') //СЃРєСЂС‹РІР°С‚СЊ С‚РµРєСѓС‰РёР№ 
							contents[innerStoryCounter - 1].classList.remove('hide') //РїРѕРєР°Р·С‹РІР°С‚СЊ РїСЂРµРґС‹РґСѓС‰РёР№
						} else { //РµСЃР»Рё Р±РѕР»СЊС€Рµ, СѓР±РёСЂР°РµС‚СЃСЏ СЃРєСЂС‹С‚РёРµ РїРµСЂРІРѕРіРѕ СЌР»РµРјРµРЅС‚Р°, Рё СЃРєСЂС‹РІР°РµС‚СЃСЏ РїРѕСЃР»РµРґРЅРёР№ (РЅСѓР¶РЅРѕ РґР»СЏ С‚РѕРіРѕ С‡С‚Рѕ Р±С‹ РїСЂРё РїРµСЂРµРєР»СЋС‡РµРЅРёРё РЅР° СЃР»РµРґСѓСЋС‰СѓСЋ РёСЃС‚РѕСЂРёСЋ, СЃР»Р°Р№РґРµСЂ РЅРµ "РїРµСЂРµРїСЂС‹РіРёРІР°Р»" С‡РµСЂРµР· СЌС‚РѕС‚ СЌР»РµРјРµРЅС‚)
							contents[0].classList.remove('hide')
							contents[contentItemsCount - 1].classList.add('hide')
						}
					} else { //РµСЃР»Рё РєРѕР»-РІРѕ РІРЅСѓС‚СЂРµРЅРЅРёС… СЃР»Р°Р№РґРѕРІ СЂР°РІРЅРѕ 2
						if (innerStoryCounter < contentItemsCount) { //РµСЃР»Рё counter РјРµРЅСЊС€Рµ С‡РµРј РєРѕР»РёС‡РµСЃС‚РІРѕ РІРЅСѓС‚СЂРµРЅРЅРёС… СЌР»РµРјРµРЅС‚РѕРІ РёСЃС‚РѕСЂРёРё
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

	function generateStory() { //РіРµРЅРµСЂР°С†РёСЏ РёСЃС‚РѕСЂРёРё (РїСЂРѕРёСЃС…РѕРґРёС‚ РїСЂРё РЅР°Р¶Р°С‚РёРё РЅР° РёРєРѕРЅРєСѓ РЅР° СЃР»Р°Р№РґРµСЂРµ РёР»Рё РЅР°РІРёРіР°С†РёРµР№ РјРµР¶РґСѓ РёСЃС‚РѕСЂРёСЏРјРё)

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
			timeForOneStory = el.duration * 1000 //Р·Р°РґР°С‘Рј РґР»РёС‚РµР»СЊРЅРѕСЃС‚СЊ РёСЃС‚РѕСЂРёРё РєР°Рє РґР»РёС‚РµР»СЊРЅРѕСЃС‚СЊ РІРёРґРµРѕ
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
});