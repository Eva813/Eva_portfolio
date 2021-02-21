$(document).ready(function () {

});


//https://www.social-lab.cc/2020/06/social-insights/%E5%9C%8B%E5%85%A7%E6%97%85%E9%81%8A%E5%9B%9E%E6%BA%AB-%E6%9C%80%E5%A4%AF%E6%97%85%E9%81%8A%E7%B8%A3%E5%B8%82%E6%8E%92%E8%A1%8C%E6%A6%9C%E5%87%BA%E7%88%90%EF%BC%81/
const bestPlace = [
  '台南',
  '台中',
  '高雄',
  '台東',
  '屏東',
  '新北',
  '宜蘭',
  '花蓮',
  '澎湖',
  '桃園'
];



//儲存上述的放入空陣列
const listItems = [];
//要能夠持續追蹤每個項目的index，所以要有個初始變數
let dragStartIndex;

//Fisher-Yates洗牌演算法
function fisherYatesShuffle(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1)); //random index
    [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
  }
}


//製作實際可以看到的list
function creatList() {
  let placeArr = [...bestPlace];
  fisherYatesShuffle(placeArr);
  $.each(placeArr, function (index, place) {
    const listItem = $('<li></li>').appendTo('#draggable-list');
    // console.log(listItem);
    listItem.attr("data-index", index);
    //listItem.addClass('wrong')
    listItem.html(`<span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
          <p class="place-name">${place}</p>
          <i class="fas fa-grip-lines"></i>
        </div>`)


    listItems.push(listItem);
    //insert into dom
    $('#draggable-list').append(listItem);
  });

  addEventListeners()
}
creatList();

//監聽事件
function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');

  //拖拉的各函式
  function dragStart() {
    // console.log('Event: ', 'dragstart');
    dragStartIndex = +this.closest('li').getAttribute('data-index');
  }

  function dragStart() {
    //console.log('Event: ', 'dragstart');
    dragStartIndex = +$(this).closest('li').attr('data-index');

    console.log(dragStartIndex);
  };
  function dragOver(e) {
    // console.log('Event: ', 'dragover');
    e.preventDefault();
  }
  //設定開始的index,以及結束的index是為了交換
  function dragDrop() {
    // console.log('Event: ', 'dragdrop');
    const dragEndIndex = +$(this).attr('data-index');
    swapItems(dragStartIndex, dragEndIndex);
    $(this).removeClass('over');
  }

  function swapItems(fromIndex, toIndex) {
    //要設定交換之前，要先到dragover去設定e.preventDefault();（因為dragover會擋到交換的執行）

    const itemOne = listItems[fromIndex].find('.draggable');
    const itemTwo = listItems[toIndex].find('.draggable');

    console.log(itemOne, itemTwo)
    listItems[fromIndex].append(itemTwo);
    listItems[toIndex].append(itemOne);
  }

  function dragEnter() {
    // console.log('Event: ', 'dragenter');
    $(this).addClass('over');
  }
  function dragLeave() {
    // console.log('Event: ', 'dragleave');
    $(this).removeClass('over');
  }


  //Dragable dot 增加監聽事件

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', dragStart);
  });
  dragListItems.forEach(item => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  })

}





//核對排名順序
function checkOrder() {
  listItems.forEach((listItem, index) => {
    const personName = listItem.find('.draggable').text().trim();

    if (personName !== bestPlace[index]) {
      listItem.addClass('wrong');
    } else {
      listItem.removeClass('wrong');
      listItem.addClass('right');
    }
  });
}



$('#check').click(checkOrder); 
