import {publish} from "../kafka/producer";

//import * as schedule from 'node-schedule';
// export const dispatchOrder = (shippingInfo: any) => {
//     const now = new Date().getTime();
//     schedule.scheduleJob(new Date(now + 1 * 60000), () => {
//         publish('order-shipping', shippingInfo.orderId, {orderId: shippingInfo.orderId, status: 'DELIVERED'});
//     });
// };

export const dispatchOrder = (shippingInfo: any) => {
    const now = new Date().getTime();
    //sleep.sleep(60);
    publish('order-shipping', shippingInfo.orderId, {orderId: shippingInfo.orderId, status: 'DELIVERED'});
};