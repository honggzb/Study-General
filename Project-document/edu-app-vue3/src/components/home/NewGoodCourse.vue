<template>
	<div class='new-course'>
		<div class='contentTitle'>
			<div class='contentTitle-left'>
				<div class='hot'>
					<div class='hot-l'>HOT</div>
					<div class='hot-r'></div>
				</div>
				<div class='txt'>
					<div class='txt-top'>新上好课</div>
					<div class='txt-bottom'></div>
				</div>
			</div>
			<div class='more'>更 多</div>
		</div>
		<div class='newCourseContent'>
			<ul>
				<li class='courseItem'>
					<div class='courseInfo'>
						<div class='courseBg'><img src="https://oss.xuexiluxian.cn/xiaoluxian-vcr/d00f57f5da1b4313928f33558880cbfe.jpg"></div>
						<div class='courseName'>JS</div>
						<div class='courseDegree'>{{ courseTypeFn(2) }} · 386人报名</div>
						<!-- <div class='courseDegree'>{{ courseTypeFn(item.courseLevel) }} · {{item.purchaseCounter + item.purchaseCnt}}人报名</div> -->
						<div class='coursePricePri'>¥ 24</div>
					</div>
				</li>
				<li class='courseItem'>
					<div class='courseInfo'>
						<div class='courseBg'>
							<img src="https://oss.xuexiluxian.cn/xiaoluxian-vcr/d00f57f5da1b4313928f33558880cbfe.jpg">
						</div>
						<div class='courseName'>JS</div>
						<div class='courseDegree'>{{ courseTypeFn(1) }} · 386人报名</div>
						<div class='coursePricePri'>¥ 24</div>
					</div>
				</li>
				<li class='courseItem'>
					<div class='courseInfo'>
						<div class='courseBg'>
							<img src="https://oss.xuexiluxian.cn/xiaoluxian-vcr/d00f57f5da1b4313928f33558880cbfe.jpg">
						</div>
						<div class='courseName'>JS</div>
						<div class='courseDegree'>{{ courseTypeFn(3) }} · 386人报名</div>
						<div class='coursePricePri'>¥ 24</div>
					</div>
				</li>
				<li class='courseItem'>
					<div class='courseInfo'>
						<div class='courseBg'>
							<img src="https://oss.xuexiluxian.cn/xiaoluxian-vcr/d00f57f5da1b4313928f33558880cbfe.jpg">
						</div>
						<div class='courseName'>JS</div>
						<div class='courseDegree'>初级 · 386人报名</div>
						<div class='coursePricePri'>¥ 20</div>
						<!-- 判断是否会员是否免费  -->
						<!-- <div class='coursePriceZero' v-if="item.discountPrice === 0">
							<div class="pricefree">免费学习</div>
							<img src="../../assets/free.jpg">
						</div>
						<div class='coursePrice' v-else-if="item.isMember">
							<div class="priceMemberbg"><span class="courseMember">会员免费</span></div>
							<div class='price'>¥ {{item.discountPrice}}</div>
						</div>
						<div class='coursePricePri' v-else>
							<div class='coursePricePri'>¥ 34</div>
						</div> -->
					</div>
				</li>
				<!-- <li class='courseItem' v-for='item in newCourse' :key='item.id'>
					<div class='courseInfo'>
						<div class='courseBg'><img :src="item.courseCover"></div>
						<div class="courseName">{{item.courseName}}</div>
              <div class="courseDegree">{{item.courseLevel}} · {{item.purchaseCounter + item.purchaseCnt}}人报名</div>
						<div class='coursePricePri'>¥ {{item.discountPrice}}</div>
					</div>
				</li>-->
			</ul>
		</div>
	</div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
//import { newCourse } from '../../utils/api/courseManage'
import courseType from '../../mixins/courseType.ts'
let { courseTypeFn } = courseType()

//新上好课的数据
let newCourseList = ref([]);
//生命周期
// onBeforeMount(()=>{
// 	newCourse({
// 		pageNum:1,
// 		pageSize:8
// 	}).then(res=>{
//         console.log( res.data.pageInfo.list );
// 		newCourseList.value = res.data.pageInfo.list;
// 	})
// })
</script>

<style scoped>
.new-course{
   	width: 1200px;
    margin: 0 auto;
    margin-top: 15px;
}
.contentTitle{
	display: flex;
	justify-content: space-between;
}
.contentTitle-left{
	display: flex;
}
.hot{
	display: flex;
    height: 38px;
}
.hot-l{
	height: 38px;
    font-size: 20px;
    padding: 0 10px;
    text-align: center;
    line-height: 37px;
    color: #ffffff;
    border-radius: 8px 0 8px 8px;
    background: linear-gradient(90deg, #ff727f 0%, #fc685c 100%);
}
.hot-r{
	width: 0;
    height: 0;
    border: 6px solid #fc685c;
    border-right-color: transparent;
    border-bottom-color: transparent;
}
.txt{
	position: relative;
    height: 38px;
    margin-left: 10px;
}
.txt-top{
	font-size: 24px;
    padding: 0 5px;
    color: #222222;
    line-height: 31px;
}
.txt-bottom{
	position: absolute;
    top: 25px;
    left: 0px;
    width: 100%;
    height: 13px;
    background: linear-gradient(90deg, #fbf84f 0%, #fea935 100%);
    border-radius: 7px;
    z-index: -1;
}
.more{
	cursor: pointer;
    font-size: 14px;
    font-weight: 400;
    color: #808080;
}
.newCourseContent{
	width: 1200px;
    margin: 15px auto 0px auto;
}
.newCourseContent ul{
	display: flex;
	flex-wrap: wrap;
}
.courseItem{
	width: 285px;
    height: 280px;
    margin: 0 20px 20px 0;
    transition: margin-top 0.2s;
}
.courseItem:hover{
    margin-top: -10px;
    cursor: pointer;
}
.courseItem:nth-child(4n+0){
    margin-right: 0 !important;
}
.courseInfo{
	position: relative;
    width: 100%;
    height: 270px;
    background: #ffffff;
    box-shadow: 1px 1px 10px rgb(27 39 94 / 40%);
    opacity: 1;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    overflow: hidden;
    text-decoration: none;
}
.courseBg{
	position: relative;
    width: 100%;
    height: 160px;
}
.courseBg img{
	width: 100%;
    height: 100%;
}
.courseName{
    margin: 10px;
    font-weight: bold;
    font-size: 14px;
    color: #333333;
    display: -webkit-box;
    overflow: hidden;
}
.courseDegree{
    margin-left: 10px;
    font-size: 12px;
    color: #808080;
}
.coursePricePri{
    width: 75px;
    font-size: 14px;
    margin-top: 18px;
    padding: 0 13px;
    color: rgba(255, 114, 127, 1);
    font-weight: 700;
}
</style>
