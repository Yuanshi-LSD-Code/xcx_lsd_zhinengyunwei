<template>
	<view class="main-layout"  >
		
		<view>
		    <slot></slot>
		</view>
		
		<template v-if="tabbarbool">
		    
		    <main-tab-bar :page-count="page_count"></main-tab-bar>
		</template>
		
		
	</view>
	
	
</template>

<script>
	export default {
		name: "main-layout",
		
		props: {
		    haveBackground: {
		        type: Boolean,
		        default() {
		            return true;
		        }
		    },
		     overflow: {
		         type: Boolean,
		         default() {
		             return true;
		         }
		     }
		},
		data() {
			return {
				tabbarbool:true,
				page_count:getCurrentPages().length,
			};
		},
		
	
	
		async onLoad() {
			
		}
	}
</script>

<style scoped lang="scss">
   .app-layout {
       max-width: 100%;
       //#ifdef MP-ALIPAY
       position: relative;
       min-height: 100vh;
       z-index: 1;
       //#endif
   }

   .app-layout-background {
       background-color: #f7f7f7;
   }

   .app-scroll-y {
       width: 100%;
       height: 100%;
   }

   .app-bottom {
       height: #{160rpx};
   }

   .nav-margin {
       width: #{750rpx};
   }

   .app-tabbar {
       height: #{110rpx};
   }

   .model {
       position: fixed;
       bottom: 0;
       left: 0;
       width: #{750rpx};
       height: #{50rpx};
       z-index: 1600;
   }
   
   .safe-area-inset-bottom {
     padding-bottom: 0;
     padding-bottom: constant(safe-area-inset-bottom);
     padding-bottom: env(safe-area-inset-bottom);
   }
</style>