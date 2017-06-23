# FigureView
react native实现的轮播图

   ![FigureView-ios](/img/figure.gif)
   
   ![FigureView-title-ios](/img/figure1.gif)
   
````   
FigureView.js(适配了Android与Ios)

ImageData.json

{
  "data": [
    {
      "img" : "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3413953738,1102676238&fm=200&gp=0.jpg",
      "title" : "你那一笑倾国倾城"
    },
    {
      "img" : "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2344518468,3052832983&fm=26&gp=0.jpg",
      "title" : "那里记录了最唯美的爱情故事"
    },
    {
      "img" : "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1381471869,537167883&fm=200&gp=0.jpg",
      "title" : "我怎么是一个剩女"
    },
    {
      "img" : "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2615553309,1722257899&fm=26&gp=0.jpg",
      "title" : "生命中最后的四分钟"
    },
    {
      "img" : "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2494637734,2622956535&fm=28&gp=0.jpg",
      "title" : "我们都需要治疗"
    }
  ]
}

使用实例：

<FigureView
           <!--图片的地址集合-->
           imgArr={imageData.data}
           <!--轮播图的高度-->
           figureHeight={140}
           <!--小圆点的位于底部的位置{left,center,right}-->
           dotPlace='center'
          <!--小圆点默认的颜色-->
           dotDefaultColor="white"
           <!--小圆点选中的颜色-->
           dotSelectedColor="red"
          <!--小圆点的半径-->
           dotRadius={5}
           <!--小圆点的间距-->
           dotMargin={5}
           <!--小圆点的父布局的样式-->
           dotParentStyle={{paddingLeft:10}}
           <!--是否显示小圆点后面的背景-->
           isHasDotBackground={true}
            <!--小圆点后面的背景的高度-->
           dotBackgroundHeight={30}
           <!--小圆点后面的背景的颜色-->
           dotBackgroundColor="#55555599"
           <!--轮播图自动滚动的时间间隔-->
           autoTime={2000}
           <!--是否自动轮播-->
           isAutoPlay={true}
           <!--图片的点击事件 参数：index 图片的索引-->
           onPageClick={this.onPageClick}
            <!--是否显示title-->
           isHasTitle={true}
           <!--title的样式-->
           titleStyle={{color:'orange',fontSize:12,fontWeight:'400',paddingRight:10}}
       />
      
  ````       
    

