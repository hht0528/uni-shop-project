<template>
  <view>
    <swiper indicator-dots
            autoplay
            circular
            :duretion="1000"
            :interval="3000">
      <swiper-item v-for="(item,index) in swiperList"
                   :key="item.goods_id">
        <navigator :url="'/subPackages/goods_detail/goods_detail?goods_id='+item.goods_id "
                   class="swiper-item">
          <img :src="item.image_src"
               alt="">
        </navigator>
      </swiper-item>
    </swiper>

    <!-- 分类导航区域 -->
    <view class="nav-list">
      <view class="nav-item"
            v-for="(item,index) in navList"
            :key="index"
            @click="navClickHandler(index)">
        <image :src="item.image_src"
               class="nav-img"></image>
      </view>
    </view>

    <!--楼层区域  -->
    <!-- 楼层的容器 -->
    <view class="floor-list">
      <!-- 每个楼层的item项 -->
      <view class="floor-item"
            v-for="(item,index) in floorList"
            :key="index">
        <!-- 楼层的标题 -->
        <image class="floor-title"
               :src="item.floor_title.image_src" />
        <!-- 楼层的图片区域 -->
        <view class="floor-img-box">
          <!-- 左侧大图片 -->
          <navigator class="left-img-box" :url="item.product_list[0].url">
            <image :src="item.product_list[0].image_src"
                   :style="{width:item.product_list[0].image_width + 'rpx'}"
                   mode="widthFix" />
          </navigator>
          <!-- 右侧大图片 -->
          <view class="right-img-box">
            <navigator class="right-img-item" v-for="(item2,index2) in rightImgList[index]" :key="index2" :url="item2.url">
              <image
                :src="item2.image_src"
                mode="widthFix"
                :style="{width:item2.image_width + 'rpx'}"
              />
            </navigator>
          </view>
        </view>
      </view>

    </view>
  </view>
</template>

<script>
import { reqSwiperList, reqNavList, reqFloorList } from '../../api/product/home'
export default {
  data() {
    return {
      swiperList: [],
      navList: [],
      floorList: [],
    }
  },
  onLoad(options) {
    this.getSwiperList(), this.getNavList(), this.getFloorList()
  },
  methods: {
    async getSwiperList() {
      const { data: res } = await reqSwiperList()
      if (res.meta.status !== 200) {
        return uni.$showMsg()
      }
      this.swiperList = res.message
    },
    async getNavList() {
      const { data: res } = await reqNavList()
      if (res.meta.status !== 200) return uni.$showMsg()
      this.navList = res.message
    },
    //获取楼层数据 
    async getFloorList() {
      const { data: res } = await reqFloorList()
      if (res.meta.status !== 200) return uni.$showMsg()
      //添加一个将来要跳转的路径
      res.message.forEach(floor=>{
        floor.product_list.forEach(prod=>{
          prod.url = '/subPackages/goods_list/goods_list?'+ prod.navigator_url.split('?')[1]
        })
      })
      this.floorList = res.message
    },
    navClickHandler(index) {
      switch (index) {
        case 1:
          uni.switchTab({ url: '/pages/cate/cate' })
          break
        case 2:
          uni.switchTab({ url: '/pages/cart/cart' })
          break
        case 3:
          uni.switchTab({ url: '/pages/my/my' })
          break
      }
    },
  },
  computed: {
    rightImgList() {
      let arr = []
      this.floorList.forEach((item,index)=> {
       arr[index] = item.product_list.filter((item1,index1)=>{
         return index1>0
        })
      }); 
      console.log(arr);
      return arr
    },

  },
}
</script>

<style scoped lang="scss">
swiper {
  height: 330rpx;
  .swiper-item,
  image {
    width: 100%;
    height: 100%;
  }
}

.nav-list {
  display: flex;
  justify-content: space-around;
  margin: 15px 0;

  .nav-img {
    width: 128rpx;
    height: 140rpx;
  }
}

.floor-title {
  width: 100%;
  height: 60rpx;
}
.floor-img-box{
display: flex;
}
.left-img-box{
  padding-left: 14rpx;
}
.right-img-box{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

</style>