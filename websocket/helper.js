function getDinner() {
  const dinnerList = [
    {
      title: '一日樂食 南京店',
      url: 'https://www.ubereats.com/tw/taipei/food-delivery/%E4%B8%80%E6%97%A5%E6%A8%82%E9%A3%9F-%E8%BC%95%E4%BE%BF%E7%95%B6-%E5%8D%97%E4%BA%AC%E5%BA%97/D5OWFvfNRhKkzfIe5VjMkQ'
    },
    {
      title: '餵way',
      url: 'https://www.ubereats.com/tw/taipei/food-delivery/%E9%A4%B5way/oiQaOFjcQPG7M-o9_9HhUQ'
    },
    {
      title: '叁x叁 輕食便當',
      url: 'https://www.ubereats.com/tw/taipei/food-delivery/%E5%8F%81x%E5%8F%81-%E8%BC%95%E9%A3%9F%E4%BE%BF%E7%95%B6-light-meal/qUWlpcaWScyuKcFOpSKb9g'
    },
    {
      title: '健康惡棍餐盒',
      url: 'https://www.ubereats.com/tw/taipei/food-delivery/%E5%81%A5%E5%BA%B7%E6%83%A1%E6%A3%8D%E9%A4%90%E7%9B%92-healthy-villain/gnT3Gf47TlysTPcTwDV68A'
    },
    {
      title: '生活倉廚 大安門市',
      url: 'https://www.ubereats.com/tw/taipei/food-delivery/life-kitchen-%E7%94%9F%E6%B4%BB%E5%80%89%E5%BB%9A-%E5%A4%A7%E5%AE%89%E9%96%80%E5%B8%82'
    },
    {
      title: '你自己選拉',
      url: 'https://www.ubereats.com/tw/category/taipei-nwt/healthy?ps=1'
    }
  ];

  const dinner = dinnerList[Math.floor(Math.random() * dinnerList.length)];
  return dinner;
}

module.exports = {
  getDinner
};
