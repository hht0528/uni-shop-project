//轮播图接口
export const reqSwiperList = () => uni.$http.get('/api/public/v1/home/swiperdata')
export const reqNavList = ()=> uni.$http.get('/api/public/v1/home/catitems')
export const reqFloorList = ()=> uni.$http.get('/api/public/v1/home/floordata')