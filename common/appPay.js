/**
 * 5+App支付,仅支持支付宝以及微信支付
 *
 * 支付宝Sdk集成,微信sdk未集成
 *
 * @param : provider(String) ->被支付方
 * @param : orderInfo(String) ->订单信息
 * @param : success,fail(Json) ->回调后的json信息
 *
 */
 
 
const mPay = (provider, orderInfo, success, fail) => (
    uni.requestPayment({
        provider,
        orderInfo, //订单数据
        success(res) {
            success(JSON.stringify(res));
        },
        fail(err) {
            fail(JSON.stringify(err));
        }
    });
)
 
export default mPay;