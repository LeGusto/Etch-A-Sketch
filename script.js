let doc = document;
let grid_container = doc.createElement('div');
let holder = doc.createElement('div');
let mid = doc.createElement('div');
let mouse_down = false;
let x_grid = 20;
let y_grid = 20;
let mode = 'color'
grid_container.classList.add('container');

holder.classList.add('holder');
mid.classList.add('mid')


document.onmousedown = () => {mouse_down = true;}
document.onmouseleave = () => {mouse_down = false;}
document.onmouseup = () => {mouse_down = false;}

function listen_res(resizer, x) {
    resizer.addEventListener('click', () =>
{
    let choice = parseInt(prompt("Enter grid size:"));
    alert(choice);
    if (typeof(choice) !== `number` || isNaN(choice)) {return;}
    choice = Math.floor(choice);
    if (choice > 100) {choice = 100;}
    else if (choice<=0) {choice = 1;}
    y_grid = choice;
    x_grid = choice;
    create_grid();
})
}

let resizers = doc.createElement('div');
resizers.classList.add('resizers');

let resizer1 = doc.createElement('button');
resizer1.textContent = "Resize";
listen_res(resizer1, true);

/*let resizer2 = doc.createElement('button');
resizer2.textContent = "Resize y";
listen_res(resizer2, false);*/

function destroy_old()
{
    let olds = doc.querySelectorAll(`.gridder`);
    olds.forEach((obj) => obj.parentNode.removeChild(obj));
}

function darken(num)
{
    num = parseInt(num);
    num-=10;
    if (num<0) {num = 0;}
    return num;
}

function lighten (num)
{
    num = parseInt(num);
    console.log(num);
    num+=10;
    if (num>255) {num = 255;}
    console.log(num);
    return num;
}

function apply(chosen)
{
    if (mode === 'color') {
        chosen.style.background = `rgb(${Math.random()*100}%, ${Math.random()*100}%, ${Math.random()*100}%)`;
    }
    else if (mode === 'erase') {
        chosen.style.background = `white`;
    } else if (mode == 'darken') {
        let rgb_v = chosen.style.background;
        let nums = rgb_v.slice(4, rgb_v.length-1).split(", ");
        nums.forEach((v) => v = parseInt(v));
        chosen.style.background = `rgb(${darken(nums[0])}, ${darken(nums[1])}, ${darken(nums[2])} )`
    } else if (mode == 'lighten') {
        let rgb_v = chosen.style.background;
        let nums = rgb_v.slice(4, rgb_v.length-1).split(", ");
        nums.forEach((v) => v = parseInt(v));
        console.log(lighten(nums[0]));
        chosen.style.background = `rgb(${lighten(nums[0])}, ${lighten(nums[1])}, ${lighten(nums[2])} )`
    }
}

function create_grid(size){

destroy_old();

    for (i = 0; i<x_grid; i++) {
        for (j = 0; j<y_grid; j++) {
            let gridder = doc.createElement('div');
            gridder.classList.add('gridder');
            /*gridder.classList.add('gridder-temp');*/
            gridder.style.background = `rgb(255, 255, 255)`;
            gridder.style.width = `${100/x_grid}%`;
            gridder.style.height = `${100/y_grid}%`;
            grid_container.appendChild(gridder);
            gridder.addEventListener('mouseenter', ()=> {
                if (mouse_down) {
                    apply(gridder);
                    /*gridder.classList.remove('gridder-temp');
                    */
                }
            });
            gridder.addEventListener('click', () => apply(gridder));
            
        }
    }
}

let settings = doc.createElement('div');
settings.classList.add('settings');

let color_m_b = doc.createElement('button');
color_m_b.textContent = 'Color';
let eraser_m_b = doc.createElement('button');
eraser_m_b.textContent = 'Erase';
let darken_m_b = doc.createElement('button');
darken_m_b.textContent = 'Darken'
let lighten_m_b = doc.createElement('button');
lighten_m_b.textContent = 'Lighten';

color_m_b.addEventListener('click', () => mode = 'color');
eraser_m_b.addEventListener('click', () => mode = 'erase');
darken_m_b.addEventListener('click', () => mode = 'darken')
lighten_m_b.addEventListener('click', () => mode = 'lighten')

create_grid();

settings.appendChild(color_m_b);
settings.appendChild(eraser_m_b);
settings.appendChild(darken_m_b);
settings.appendChild(lighten_m_b);


resizers.appendChild(resizer1);
holder.appendChild(resizers);
holder.appendChild(grid_container);
holder.appendChild(settings);

mid.appendChild(grid_container);
mid.appendChild(settings);
holder.appendChild(mid);

doc.body.appendChild(holder);