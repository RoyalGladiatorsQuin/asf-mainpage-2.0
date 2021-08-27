<template>
	<div id="mbIntroduction">
			<header>
				<div>
					→
				</div>
				<div style="text-decoration: underline rgb(22, 253, 255);">
					成员介绍
				</div>
				<div>
					←
				</div>
			</header>
			<div id="All">
				<div class="tools">
					<div class="img" style="height: 100%;">
						<img :src="imgURL[0].bella" width="100%" height="100%">
					</div>
					<div class="introduction">
						<span>贝拉</span>
						<div class="hr Bella"></div>
						<span>Bella</span>
					</div>
					<div class="biaoqian" @click="BlBella()">
						<div class="Link">LEARN&nbsp;MORE&nbsp;→
						</div>
						<div class="triangle"></div>
					</div>
				</div>
				<div class="tools">
					<div class="img" style="height: 100%;">
						<img :src="imgURL[1].carol" width="100%" height="100%" alt="">
					</div>
					<div class="introduction">
						<span>珈乐</span>
						<div class="hr Carol"></div>
						<span>Carol</span>
					</div>
					<div class="biaoqian" @click="BlCarol()">
						<div class="Link">LEARN&nbsp;MORE&nbsp;→
						</div>
						<div class="triangle"></div>
					</div>
				</div>
				<div class="tools">
					<div class="img" style="height: 100%;">
						<img :src="imgURL[2].diana" width="100%" height="100%" alt="">
					</div>
					<div class="introduction">
						<span>嘉然</span>
						<div class="hr Diana"></div>
						<span>Diana</span>
					</div>
					<div class="biaoqian" @click="BlDiana()">
						<div class="Link">LEARN&nbsp;MORE&nbsp;→
						</div>
						<div class="triangle"></div>
					</div>
				</div>
				<div class="tools">
					<div class="img" style="height: 100%;">
						<img :src="imgURL[3].queen" width="100%" height="100%" alt="">
					</div>
					<div class="introduction">
						<span>乃琳</span>
						<div class="hr Queen"></div>
						<span>Queen</span>
					</div>
					<div class="biaoqian" @click="BlQueen()">
						<div class="Link">LEARN&nbsp;MORE&nbsp;→
						</div>
						<div class="triangle"></div>
					</div>
				</div>
				<div class="tools">
					<div class="img" style="height: 100%;">
						<img :src="imgURL[4].ava" width="100%" height="100%" alt="">
					</div>
					<div class="introduction">
						<span>向晚</span>
						<div class="hr Ava"></div>
						<span>Ava</span>
					</div>
					<div class="biaoqian" @click="BlAva()">
						<div class="Link">LEARN&nbsp;MORE&nbsp;→
						</div>
						<div class="triangle"></div>
					</div>
				</div>
			</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				imgURL:[
					{
						bella:require('../../../img/Bella.jpg')
					},{
						carol:require('../../../img/Carol.jpg')
					},{
						diana:require('../../../img/Diana.jpg')
					},{
						queen:require('../../../img/Queen.jpg')
					},{
						ava:require('../../../img/Ava.jpg')
					}
				]
			}
		},
		methods:{
			BlBella(){
				window.open("https://space.bilibili.com/672353429?from=search&seid=16096951031496074323")
			},
			BlCarol(){
				window.open("https://space.bilibili.com/351609538?from=search&seid=16923552196334166437")
			},
			BlDiana(){
				window.open("https://space.bilibili.com/672328094?from=search&seid=17053150586267451650")
			},
			BlQueen(){
				window.open("https://space.bilibili.com/672342685?from=search&seid=17591245324044654297")
			},
			BlAva(){
				window.open("https://space.bilibili.com/672346917?from=search&seid=8872353801734758039")
			}
		}
	}
</script>

<style>
	
::-webkit-scrollbar {
    width: 3px;
    height: 6px;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
    /*可以自定义颜色*/
    background-color: black;
    opacity: 0.5;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
    width: 6px;
    border-radius: 10px;
    box-shadow: inset 0 0 0px rgba(240, 240, 240, .5);
    background-color: grey;
}
	
	.tools{
		position: relative;
		width: 28vh;
		height: 65vh;
	}
	
	#All{
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		position: absolute;
		width: 80%;
		height: 80%;
		left: 50%;
		top: 50%;
		margin-top: 5%;
		transform: translate(-50%, -50%);
	}
	
	#mbIntroduction{
		background-color: black;
		height: 100vh;
	}
	
	.tools .img::after{
		content: "";
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		filter: grayscale(1);
		-webkit-filter: grayscale(100%); 
		-moz-filter: grayscale(100%); 
		-ms-filter: grayscale(100%); 
		-o-filter: grayscale(100%); 
		filter:progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);  
		_filter:none; 
		z-index: 1;
	}
	
	
	.tools .img{
		cursor: pointer;
		filter: grayscale(1);
		transition: all 0.5s;
	}
	
	.tools:hover .img{
		filter: grayscale(0);
	}
	
	.tools:hover .introduction{
		opacity: 0;
	}
	
	.tools .introduction{
		transition: all 0.5s;
	}
	
	.introduction{
		cursor: pointer;
		display: flex;
		flex-direction: column;
		transform: translate(-50%);
		position: absolute;
		top: 55%!important;
		top: 36vh!important;
		left: 50%;
		color: white;
		z-index: 2;
	}
	
	.hr{
		z-index: -1;
		position: absolute;
		width: 120%;
		height: 15%;
		top: 80%;
		left: -10%;
	}
	
	.Bella{
		background-color: #BD7D74;
	}
	
	.Carol{
		background-color: #B8A6D9;
	}
		
	.Diana{
		background-color: #E799B0;
	}
	
	.Queen{
		background-color: #576690;
	}
	
	.Ava{
		background-color: #9AC8E2;
	}
	
	.introduction>span:first-child{
		font-size: 2.5rem;
		font-weight: 600;
	}
	
	.introduction>span:last-child{
		font-size: 3.5rem;
		text-decoration: blink;
	}
	
	header{
		letter-spacing:.2rem;
		padding-top:2%;
		display: flex;
		font-size: 3rem;
		font-weight: 700;
		color: white;
		flex-direction: row;
		justify-content: center;
	}
	
	.Link{
		position: absolute;
		z-index: 1;
		font-weight: 700;
		text-align: center;
		line-height: 4.5vh;
    width: 100%;
		height: 100%;
		background-color: white;
	}
	
	.biaoqian:hover{
		transform: translateY(-2px);
		box-shadow: 0px 0px 6px #858282;
	}
	
	.triangle{
		position: absolute;
    z-index: 0;
    height: 0;
    width: 0;
		right: 0;
    bottom: -1.5vh;
    border-top: 1.5vh solid rgb(16, 208, 209);
    border-right: 1.18vh solid transparent;
		}	
	
	.biaoqian{
		transition: all 1s;
		cursor: pointer;
		width: 77%;
		height: 7%;
		position: absolute;
		top: 88%;
		left: 27%;
	}
	
	@media screen and (min-width: 1026px) and (max-width: 1437px){
		header{
			font-size: 2rem;
		}
		
		.introduction>span:first-child{
			font-size: 2rem;
			font-weight: 600;
		}
		
		.introduction>span:last-child{
			font-size: 3rem;
			text-decoration: blink;
		}
		
		.Link{
			font-size: 13px;
		}
	}
	
	@media screen and (min-width: 1438px) and (max-width: 1600px) {
		header{
			font-size: 2rem;
		}
		
		.introduction>span:first-child{
			font-size: 2rem;
			font-weight: 600;
		}
		
		.introduction>span:last-child{
			font-size: 3rem;
			text-decoration: blink;
		}
		
		.Link{
			font-size: 13px;
		}
	}
	
	@media screen and (min-width:1601px) and (max-width: 1800px){
		header{
			font-size: 2rem;
		}
		
		.introduction>span:first-child{
			font-size: 2rem;
			font-weight: 600;
		}
		
		.introduction>span:last-child{
			font-size: 3rem;
			text-decoration: blink;
		}
		
		.Link{
			font-size: 13px;
		}
	}
	
</style>
