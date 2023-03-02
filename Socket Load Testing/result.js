// server behaved normally when we connect 10 users/sec   100MS
// server behave abnormally when connecting 20 users/sec   50MS

// 50 users/sec     20MS 




// Socket Load Test Report Wed 26 OCTOBER URL = https://chat.by433.com:3030 ENV: STAGING
// Test 01 : 10 users/sec  -   Target to connect = 8000 Users
// Stable at 10 Users/sec total users connected to the server  =  2000
// after 2500 slow server 10 users in 2 seconds
// socket not accepting more than 4017 users , getting errors, socket down then restarted
