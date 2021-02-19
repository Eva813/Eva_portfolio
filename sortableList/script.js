
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

//製作實際可以看到的list
