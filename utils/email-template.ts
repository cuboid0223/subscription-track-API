export const generateEmailTemplate = ({
    userName,
    subscriptionName,
    renewalDate,
    planName,
    price,
    paymentMethod,
    accountSettingsLink,
    supportLink,
    daysLeft,
  }) => `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 0; background-color: #f4f7fa;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <tr>
              <td style="background-color: #4a90e2; text-align: center;">
                  <p style="font-size: 54px; line-height: 54px; font-weight: 800;">HintCode</p>
              </td>
          </tr>
          <tr>
              <td style="padding: 40px 30px;">                
                  <p style="font-size: 16px; margin-bottom: 25px;">您好，<strong style="color: #4a90e2;">${userName}</strong>先生，</p>
                  
                  <p style="font-size: 16px; margin-bottom: 25px;">您的 <strong>${subscriptionName}</strong> 訂閱將於 <strong style="color: #4a90e2;">${renewalDate}</strong> 到期 (倒數 ${daysLeft}).</p>
                  
                  <table cellpadding="15" cellspacing="0" border="0" width="100%" style="background-color: #f0f7ff; border-radius: 10px; margin-bottom: 25px;">
                      <tr>
                          <td style="font-size: 16px; border-bottom: 1px solid #d0e3ff;">
                              <strong>方案:</strong> ${planName}
                          </td>
                      </tr>
                      <tr>
                          <td style="font-size: 16px; border-bottom: 1px solid #d0e3ff;">
                              <strong>價格:</strong> ${price}
                          </td>
                      </tr>
                      <tr>
                          <td style="font-size: 16px;">
                              <strong>付款方式:</strong> ${paymentMethod}
                          </td>
                      </tr>
                  </table>
                  
                  <p style="font-size: 16px; margin-bottom: 25px;">如果您想更改或取消訂閱，請在續訂日期前前往您的<a href="${accountSettingsLink}" style="color: #4a90e2; text-decoration: none;">帳戶設置</a>。</p>
                  
                  <p style="font-size: 16px; margin-top: 30px;">需要幫助? 聯絡我們的<a href="${supportLink}" style="color: #4a90e2; text-decoration: none;">服務團隊</a></p>
                  
                  <p style="font-size: 16px; margin-top: 30px;">
                      Best regards,<br>
                      <strong>The HintCode Team</strong>
                  </p>
              </td>
          </tr>
          <tr>
              <td style="background-color: #f0f7ff; padding: 20px; text-align: center; font-size: 14px;">
                  <p style="margin: 0 0 10px;">
                      HintCode Inc. | 37 Anping St, Tainan, TW 708
                  </p>
                  <p style="margin: 0;">
                      <a href="#" style="color: #4a90e2; text-decoration: none; margin: 0 10px;">取消訂閱</a> | 
                      <a href="#" style="color: #4a90e2; text-decoration: none; margin: 0 10px;">隱私權政策</a> | 
                      <a href="#" style="color: #4a90e2; text-decoration: none; margin: 0 10px;">服務項目</a>
                  </p>
              </td>
          </tr>
      </table>
  </div>
  `;
  
  export const emailTemplates = [
    {
      label: "7 days before reminder",
      generateSubject: (data) =>
        `📅 提醒: 您的 ${data.subscriptionName} 訂閱服務將於一周後失效!`,
      generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 7 }),
    },
    {
      label: "5 days before reminder",
      generateSubject: (data) =>
        `⏳ ${data.subscriptionName} 將於五天後失效 !`,
      generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 5 }),
    },
    {
      label: "2 days before reminder",
      generateSubject: (data) =>
        `🚀 還有兩天!  ${data.subscriptionName} 即將到期`,
      generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 2 }),
    },
    {
      label: "1 days before reminder",
      generateSubject: (data) =>
        `⚡ 最後提醒: ${data.subscriptionName} 將於明天到期 !`,
      generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 1 }),
    },
  ];