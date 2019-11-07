<template>
    <view class="page">
	<footermenu PageCur="index"></footermenu>
	</view>
</template>
<script>
    import {mapState,mapMutations} from 'vuex';
    export default {
        computed: mapState(['hasLogin','uerInfo']),
        methods: {
            ...mapMutations(['logout']),
			checklogonstate(){
				if (!this.hasLogin) {
				    uni.navigateTo({
				        url: '../person/logon'
				    })
				}
			}
        },
		onLoad:function(options){
		  this.checklogonstate();
		},
		
    }
</script>