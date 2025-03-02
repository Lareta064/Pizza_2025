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
});
