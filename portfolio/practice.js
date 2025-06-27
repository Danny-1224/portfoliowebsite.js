const $menu = document.getElementById('menu');
const $li = $menu.querySelectorAll('li');
const $hue1 = document.querySelector('#h1');
const $hue2 = document.querySelector('#h2');

document.addEventListener("contextmenu", (event) => {
    
    const menuBox = $menu.getBoundingClientRect();
    const bodyBox = { width: window.innerWidth, height: window.innerHeight }
    const target = {  x: event.clientX, y: event.clientY }
    const padding = { x: 30, y: 20 }
    
    const hitX = target.x + menuBox.width >= bodyBox.width - padding.x;
    const hitY = target.y + menuBox.height >= bodyBox.height - padding.y;
    
    if ( hitX ) {
        target.x = bodyBox.width - menuBox.width - padding.x;
    }
    
    if ( hitY ) {
        target.y = bodyBox.height - menuBox.height - padding.y;
    }
    
    const $target = event.target;
    const isMenu = $menu.contains( $target );
    event.preventDefault();
    
    if( !isMenu ) {
        $menu.style.left = target.x + 'px';
        $menu.style.top = target.y + 'px';
        $menu.classList.add('open');
        $li.forEach($el => {
          $el.classList.remove('selected');  
        })
    }
    
});

document.addEventListener('pointerdown', (event) => {
    const $target = event.target;
    const isMenu = $menu.contains( $target );
    const isSlider = $target.matches( 'input' );
    if( !isMenu && !isSlider ) {
        $menu.classList.remove('open');
    } else if (isMenu) {
        $li.forEach($el => {
          $el.classList.remove('selected');  
        })
        if ( $target.matches('li') ) {
            $target.classList.add('selected');
        }
    }
});

$hue1.addEventListener( 'input', (event) => {
    requestAnimationFrame(() => {
        document.body.style.setProperty('--hue1', event.target.value );
        $menu.classList.add('open');
    })
});