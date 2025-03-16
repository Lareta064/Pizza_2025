document.addEventListener("DOMContentLoaded", function () {
    let bodyEl = document.body;
    let headerBlock = document.querySelector('header.header');
    const hasDropItem = document.querySelector('#has-drop');
    const dropMenu =  document.querySelector('#drop-menu');
    // HEADER SUBMENU
    if(hasDropItem){
      

      hasDropItem.addEventListener('click', ()=>{
          if(dropMenu.classList.contains('active')){
            dropMenu.classList.remove('active');
            headerBlock.classList.remove('show-after');
          }else{
            dropMenu.classList.add('active');
            headerBlock.classList.add('show-after');
          }
      });
    }

    // MOBILE MENU
    const mobileMenuIcon = document.querySelector('#menu-toggle');
    const mobileMenuBlock = document.querySelector('#moble-menu');
   
    
    if(mobileMenuIcon){
      
      function hideMobileMenu(){
        mobileMenuIcon.classList.remove('active');
        mobileMenuBlock.classList.remove('active');
        bodyEl.classList.remove('lock');
      }
      mobileMenuIcon.addEventListener('click', ()=>{
        if(mobileMenuIcon.classList.contains('active')){
          hideMobileMenu();
        }else{
          mobileMenuIcon.classList.add('active');
          mobileMenuBlock.classList.add('active');
          bodyEl.classList.add('lock');
        }
      });
     
      mobileMenuBlock.addEventListener('click', (e)=>{
        if(e.target == e.currentTarget){
          hideMobileMenu();
        }
      });
      dropMenu.querySelectorAll('A').forEach((item)=>{
        item.addEventListener('click', ()=>{
          hideMobileMenu();
        });
      });
    }

    //HEADER FIXED DESKTOP
    const headerTop = document.querySelector('#header-fixed');
    window.addEventListener('scroll', function(){
        if(this.innerWidth >= 768){
            if(this.pageYOffset > 200){
                headerTop.classList.add('header--slim');
            }
            else{
                headerTop.classList.remove('header--slim');
            }
        }
    });
    
    /* =============== modal с атрибутом [data-modal] ===============*/ 
    const modalOpen = document.querySelectorAll('[data-btn]');
    const modalFrames = document.querySelectorAll('[data-modal]');
    
    if (modalFrames.length > 0) {
        const modalFramesClose = document.querySelectorAll('[data-close]');
    
        // Открытие модального окна
        for (let item of modalOpen) {
            item.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation(); // Предотвращаем всплытие
    
                const itemAttr = item.getAttribute('data-btn');
    
                for (let frame of modalFrames) {
                    const frameAttr = frame.getAttribute('data-modal');
                    if (frameAttr === itemAttr) {
                        frame.classList.add('visible');
                        document.body.classList.add('lock');
                    }
                }
            });
        }
    
        // Закрытие модального окна при клике на крестик (data-close)
        for (let item of modalFramesClose) {
            item.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation(); // Предотвращаем всплытие
    
                const parentModal = item.closest('[data-modal]');
                if (parentModal) {
                    // Закрываем текущее модальное окно
                    parentModal.classList.remove('visible');
    
                    // Закрываем все дочерние модальные окна внутри родителя
                    const childModals = parentModal.querySelectorAll('[data-modal].visible');
                    for (let child of childModals) {
                        child.classList.remove('visible');
                    }
    
                    // Проверяем, остались ли открытые модальные окна
                    const anyModalVisible = document.querySelector('[data-modal].visible');
                    if (!anyModalVisible) {
                        document.body.classList.remove('lock');
                    }
                }
            });
        }
    
        // Закрытие модальных окон по клику вне их
        document.addEventListener('click', function (e) {
            const target = e.target;
    
            // Проверяем, кликнули ли мы по data-modal, но не по data-btn внутри него
            if (target.matches('[data-modal]') && !target.querySelector('[data-btn]:hover')) {
                // Закрываем и текущее модальное окно, и его дочерние модалки
                target.classList.remove('visible');
                const childModals = target.querySelectorAll('[data-modal].visible');
                for (let child of childModals) {
                    child.classList.remove('visible');
                }
    
                // Проверяем, остались ли открытые модальные окна
                const anyModalVisible = document.querySelector('[data-modal].visible');
                if (!anyModalVisible) {
                    document.body.classList.remove('lock');
                }
            }
        });
    }
    // DROP SELECT
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(function (dropDownWrapper) {
        const dropDownInput = dropDownWrapper.querySelector('.dropdown__input');
        const dropDownList = dropDownWrapper.querySelector('.dropdown__list');
        const dropDownListItems = dropDownList.querySelectorAll('.dropdown__list-item');
        const dropDownSelected = dropDownList.querySelector('.selected');
        const radioInput = dropDownWrapper.closest('.switch-label')?.querySelector('input[type="radio"]');
    
        // Клик по инпуту. Открыть/Закрыть select
        dropDownInput.addEventListener('click', function (e) {
            dropDownList.classList.toggle('dropdown__list--visible');
            this.classList.toggle('dropdown__input--active');
            if (radioInput) radioInput.checked = true;
        });
    
        // Выбор элемента списка. Запомнить выбранное значение. Закрыть дропдаун
        dropDownListItems.forEach(function (listItem) {
            listItem.addEventListener('click', function (e) {
                e.stopPropagation();
                dropDownListItems.forEach(function (item) { item.classList.remove('selected') });
                
                dropDownInput.value = this.dataset.value;
                this.classList.add('selected');
                dropDownList.classList.remove('dropdown__list--visible');
                dropDownInput.classList.remove('dropdown__input--active');
                if (radioInput) radioInput.checked = true;
            });
        });
    
        // Клик снаружи дропдауна. Закрыть дропдаун
        document.addEventListener('click', function (e) {
            if (!dropDownWrapper.contains(e.target)) {
                dropDownInput.classList.remove('dropdown__input--active');
                dropDownList.classList.remove('dropdown__list--visible');
            }
        });
    
        // Нажатие на Tab или Escape. Закрыть дропдаун
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Tab' || e.key === 'Escape') {
                dropDownInput.classList.remove('dropdown__input--active');
                dropDownList.classList.remove('dropdown__list--visible');
            }
        });
    });
    
    // Устанавливаем checked при клике на #datepicker
    const datepickerInput = document.querySelector('#datepicker');
    if (datepickerInput) {
        datepickerInput.addEventListener('click', function () {
            const radioInput = this.closest('.switch-label')?.querySelector('input[type="radio"]');
            if (radioInput) radioInput.checked = true;
        });
    }
    
      /*DELIVERY HIDE FIELDS */
      const deliverySwitch = document.querySelector('#switch-delivery');
      if(deliverySwitch){
        deliverySwitchLabels = deliverySwitch.querySelectorAll('.switch-label');
        deliverySwitchLabels.forEach((swtch)=>{

          swtch.addEventListener('click', ()=>{
            
            const thisInputRadio = swtch.querySelector('[type="radio"]');
            const hideDeliveryFields = document.querySelector('#delivery-courier');
            const pickupDeliveryFields = document.querySelector('#delivery-pickup');
            if(swtch.classList.contains('switch-delivery-courier')){
              if(thisInputRadio.checked){
                hideDeliveryFields.classList.add('filds-visible');
                pickupDeliveryFields.classList.add('filds-hide');
              }
            }else{
              hideDeliveryFields.classList.remove('filds-visible');
              pickupDeliveryFields.classList.remove('filds-hide');
            }
          });
        });
      }
    //ACORDION
    $(function() {
    
        //BEGIN
        $(".accordion__title").on("click", function(e) {
        
          e.preventDefault();
          var $this = $(this);
        
          if (!$this.hasClass("accordion-active")) {
          $(".accordion__content").slideUp(400);
          $(".accordion__title").removeClass("accordion-active");
          $('.accordion__arrow').removeClass('accordion__rotate');
          }
        
          $this.toggleClass("accordion-active");
          $this.next().slideToggle();
          $('.accordion__arrow',this).toggleClass('accordion__rotate');
        });
        //END
      
      });
    
});

document.addEventListener("DOMContentLoaded", function () {
  const lvl1 = document.querySelectorAll('.js-level_1 > button');
  const lvl2 = document.querySelectorAll('.js-level_2');
  const lvl3 = document.querySelectorAll('.js-level_3');

  // Toggle lvl 2 options and all lvl 3 cards
  lvl1.forEach(
    (btn, ind) => btn.addEventListener('click', () => lvl1Handler(ind))
  );

  // Lvl 2 btns click 
  lvl2.forEach(
    btnsContainer => {
      // Iterate over every lvl 2 btn and add listener
      for(const lvl2btn of btnsContainer.children){
        lvl2btn.addEventListener('click', lvl2Handler)
      }
    }
  )

  function lvl1Handler (ind) {
    // Hide previous lvl2 options
    document.querySelector('.js-level_2.active')?.classList?.remove('active');

    // Show new lvl2 options
    lvl2[ind].classList.add('active');

    // Hide previous lvl3 cards
    document.querySelector('.js-level_3.active')?.classList?.remove('active');

    // Clear all hidden cards
    document.querySelectorAll('.js-level_3 .filtered').forEach(card => card.classList.remove('filtered'));
    
    // Show new card set
    lvl3[ind].classList.add('active');
  };

  function lvl2Handler (e) {
    // Btn and active cards wrapper
    const btnTag = e.target.getAttribute('data-tag');
    const activeCardsWrapper = document.querySelector('.js-level_3.active');
    
    // Clear up hidden cards
    for(const lvl3card of activeCardsWrapper.children){
      lvl3card.classList.remove('filtered')
      
      // If reset tag pressed - skip filtering
      if(btnTag === '*') continue;

      // Filter cards
      if(!lvl3card.getAttribute('data-tags').split(' ').includes(btnTag)) 
        lvl3card.classList.add('filtered');
    }
  }

  const itemsGroup = document.querySelectorAll('.js-group');
  if (itemsGroup.length > 0) {
    for (let item of itemsGroup) {
      const itemsGroupChilds = item.querySelectorAll('.js-group-item');
      item.addEventListener('click', function (e) {
        for (let el of itemsGroupChilds) {
          el.classList.remove('active');
        }
        e.target.classList.add('active');
      });
    }
  }
  //SEO TEXT 

  const seoAboutText = document.querySelector('.hide-seo');
  if(seoAboutText){
    const toggleSeoText = document.querySelector('.toggle-hide-seo');
    if(toggleSeoText){
      toggleSeoText.addEventListener('click', function(){
        if(toggleSeoText.classList.contains('active')){

          toggleSeoText.textContent = 'Подробнее';
          toggleSeoText.classList.remove('active');
          seoAboutText.style.height = 0;
        }else{
          toggleSeoText.textContent = 'Свернуть';
          toggleSeoText.classList.add('active');
          seoAboutText.style.height = seoAboutText.scrollHeight + 'px';
        }
      });
    }
  }
  
});
document.addEventListener('DOMContentLoaded', function() {
  const tabsContainers = document.querySelectorAll('.tabs-container');
  
    tabsContainers.forEach(container => {
      const tabs = container.querySelectorAll('.tab');
      const contents = container.querySelectorAll('.tab-content');
  
      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          tabs.forEach(innerTab => innerTab.classList.remove('active'));
          tab.classList.add('active');
  
          contents.forEach(content => content.classList.remove('active'));
          const activeContent = container.querySelector(tab.getAttribute('data-tab-target'));
  
          // Проверяем, существует ли элемент activeContent перед добавлением класса
          if (activeContent) {
            activeContent.classList.add('active');
          } else {
            console.error('Ошибка: Нет элемента соответствующего data-tab-target:', tab.getAttribute('data-tab-target'));
          }
        });
      });
    });
  });