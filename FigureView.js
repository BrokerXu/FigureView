/**
 * Created by BrokerXu on 2017/6/21.
 */
import React, {Component} from 'react';
import {Image,Text, View, ScrollView, Dimensions, TouchableHighlight} from 'react-native';
import PropTypes from 'prop-types';


const {width} = Dimensions.get('window');

/***
 * react-native 实现的轮播图
 *
 *  <FigureView
 *      imgArr={imageData.data}
 *      figureHeight={140}
 *      figurePlace='center'
 *      dotDefaultColor="white"
 *      dotSelectedColor="red"
 *      dotRadius={5}
 *      dotMargin={5}
 *      dotParentStyle={{paddingLeft:10}}
 *      isHasDotBackground={true}
 *      dotBackgroundHeight={30}
 *      dotBackgroundColor="#55555599"
 *      autoTime={2000}
 *      isAutoPlay={true}
 *      onPageClick={this.onPageClick}
 *      isHasTitle={true}
 *      titleStyle={{color:'orange',fontSize:12,fontWeight:'400',paddingRight:10}}/>
 *
 */
export default class FigureView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentPage: 0,
            title:this.props.imgArr[0].title
        };

    }

//设置props值类型
    static propTypes = {
        imgArr: PropTypes.array,
        figureHeight: PropTypes.number,
        dotPlace: PropTypes.string,
        dotDefaultColor: PropTypes.string,
        dotSelectedColor: PropTypes.string,
        dotRadius: PropTypes.number,
        dotMargin: PropTypes.number,
        isHasDotBackground: PropTypes.bool,
        dotBackgroundHeight: PropTypes.number,
        dotBackgroundColor: PropTypes.string,
        isHasTitle:PropTypes.bool,
        isAutoPlay: PropTypes.bool,
        autoTime: PropTypes.number,
        onPageClick: PropTypes.func,
    };

//初始化默认值
    static defaultProps = {
        //图片集合
        imgArr : [],
        // //焦点图的高度
        figureHeight : 120,
        // //焦点显示的位置{left,center,right}
        dotPlace : 'left',
        // //焦点默认状态的颜色
        dotDefaultColor : 'white',
        // //焦点选中后的颜色
        dotSelectedColor : 'red',
        // //焦点的半径
        dotRadius : 10,
        //焦点之间的间距
        dotMargin : 10,
        //焦点的样式
        dotParentStyle : {},
        //是否显示底部背景
        isHasDotBackground: true,
        //底部背景的高度
        dotBackgroundHeight: 35,
        //显示的底部背景颜色
        dotBackgroundColor: '#f7f7f7',
        //是否显示title
        isHasTitle:true,
        //title文字的样式
        titleStyle:{color:'white',fontSize:14,fontWeight:'500'},
        // //是否自动轮播
        isAutoPlay: true,
        // //轮播时间间隔(单位：ms)
        autoTime: 2000,
        onPageClick: (index) => {
            console.log(index)
        }
    };


    componentWillMount() {
        let figurePlace = this.props.dotPlace;
        this.dotJustifyContent = 'flex-start';
        if ("left".startsWith(figurePlace)) {
            this.dotJustifyContent = "flex-start";
        } else if ('center'.startsWith(figurePlace)) {
            this.dotJustifyContent = 'center';
            this.props.isHasTitle = false;
        } else if ('right'.startsWith(figurePlace)) {
            this.dotJustifyContent = 'flex-end';
        }
    }

    //开启定时器
    startTimer() {
        if (this.props.isAutoPlay) {
            const pageArr = this.props.imgArr;
            const pageCount = pageArr.length;
            const autoTime = this.props.autoTime;
            this.timer = setInterval(
                () => {
                    let currentPage = this.state.currentPage;
                    let activePage = 0;
                    if (currentPage + 1 >= pageCount) {
                        activePage = 0;
                    } else {
                        activePage = currentPage + 1;
                    }
                    this.setState({
                        currentPage: activePage,
                        title:this.getTitle(activePage)
                    });

                    let offsetX = activePage * width;

                    this.scrollFigure.scrollTo({x: offsetX, y: 0, animated: true});
                },
                autoTime
            );
        }
    }

    getTitle(index){
        return this.props.isHasTitle?this.props.imgArr[index].title : '';
    }

    // //实现拖拽无限滚动
    // scrollUnlimited(e) {
    //    let offsetX = e.nativeEvent.contentOffset.x;
    //    let pageCount = this.props.imgArr.length;
    //    let maxOffsetX = pageCount * width;
    //
    //    if(offsetX>maxOffsetX){
    //        this.setState({
    //            currentPage:0
    //        });
    //        this.scrollFigure.scrollTo({x:0,y:0,animated:true});
    //    }else if(offsetX<0){
    //        this.setState({
    //            currentPage:pageCount-1
    //        });
    //        this.scrollFigure.scrollTo({x:maxOffsetX,y:0,animated:true});
    //    }
    // }


    //组件加载完毕
    componentDidMount() {
        //开启定时器
        this.startTimer();

    }

    //组件将被销毁
    componentWillUnmount() {
        //清除定时器
        this.timer && clearInterval(this.timer);
    }


    //开始拖拽时清除定时器
    onScrollBeginDrag() {
        //清除定时器
        this.timer && clearInterval(this.timer);
    }

    //结束拖拽时开启定时器
    onScrollEndDrag() {
        //开启定时器
        this.startTimer();
    }


    scrollNextPage(e) {
        //获取偏移量
        let offsetX = e.nativeEvent.contentOffset.x;

        //得到当前页索引
        let currentPage = Math.floor(offsetX / width);
        //更新状态，刷新UI
        this.setState({
            currentPage,
            title:this.getTitle(currentPage)
        });

    }

    //点击原点切换页面
    dotOnScroll(index) {
        let offsetX = width * index;
        this.setState({
            currentPage: index,
            title:this.getTitle(index)
        });
        this.scrollFigure.scrollTo({x: offsetX, y: 0, animated: true});

    }

    getTitleTextView(textAlign){
        return this.props.isHasTitle && <Text
                style={[{flex:1,alignSelf:'center',textAlign:textAlign,marginLeft:this.props.dotMargin,marginRight:this.props.dotMargin},this.props.titleStyle]}
                numberOfLines={1}
            >{this.state.title}</Text>;
    }

    render() {
        return (
            <View style={{height: this.props.figureHeight}}>
                <ScrollView
                    ref={(scrollFigure) => {
                        this.scrollFigure = scrollFigure;
                    }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}
                    sendMomentumEvents={true}
                    // onScroll={(e) => this.scrollUnlimited(e)}
                    //一帧滚动结束的时候调用
                    onMomentumScrollEnd={(e) => this.scrollNextPage(e)}
                    //开始拖拽
                    onScrollBeginDrag={this.onScrollBeginDrag.bind(this)}
                    //结束拖拽
                    onScrollEndDrag={this.onScrollEndDrag.bind(this)}

                >
                    {
                        this.props.imgArr.map((value, index) => {
                            return <TouchableHighlight
                                key={index}
                                activeOpacity={0.98}
                                onPress={() => this.props.onPageClick && this.props.onPageClick(index)}
                            >
                                <Image
                                    key={index}
                                    source={{uri: value.img}}
                                    resizeMode="cover"
                                    style={{height: this.props.figureHeight, width: width}}
                                />
                            </TouchableHighlight>
                        })
                    }

                </ScrollView>
                <View style={{
                    width: width,
                    height: this.props.dotBackgroundHeight,
                    backgroundColor: this.props.isHasDotBackground ? this.props.dotBackgroundColor : 'translate',
                    position: 'absolute',
                    bottom: 0,
                    flexDirection: 'row',
                }}>
                    {'right'.startsWith(this.props.dotPlace)&&this.getTitleTextView('left')}

                    <View style={[{
                        flex: 1,
                        height: this.props.dotBackgroundHeight,
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginLeft: this.props.dotMargin,
                        marginRight: this.props.dotMargin,
                        justifyContent:this.dotJustifyContent
                    },this.props.dotParentStyle]}>
                        {this.props.imgArr.map((value, index) => {
                            return <TouchableHighlight
                                key={index}
                                activeOpacity={1.0}
                                onPress={() => this.dotOnScroll(index)}
                            >
                                <View
                                    key={index}
                                    style={{
                                        width: this.props.dotRadius * 2,
                                        height: this.props.dotRadius * 2,
                                        borderRadius: this.props.dotRadius,
                                        backgroundColor: this.state.currentPage === index ? this.props.dotSelectedColor : this.props.dotDefaultColor,
                                        marginLeft: this.props.dotMargin,
                                    }}

                                />
                            </TouchableHighlight>;
                        })}
                    </View>
                    {'left'.startsWith(this.props.dotPlace)&&this.getTitleTextView('right')}
                </View>
            </View>
        );
    }
}