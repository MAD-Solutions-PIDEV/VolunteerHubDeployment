import { useState } from "react";

function ResetPwdUser() {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.newPassword !== formData.confirmNewPassword) {
      // handle password mismatch error
      return;
    }
    fetch("/api/auth/reset/:token", {
      method: "POST",
      body: JSON.stringify({
        newPassword: formData.newPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Reset password request failed");
        }
        // handle successful password reset
      })
      .catch((error) => {
        // handle password reset error
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div class="main_content_iner overly_inner ">
        <div class="container-fluid p-0  ">
          <div class="row">
            <div class="col-12">
              <div class="page_title_box d-flex flex-wrap align-items-center justify-content-between">
                <div class="page_title_left d-flex align-items-center">
                  <h3 class="f_s_25 f_w_700 dark_text mr_30">Reset Password</h3>
                </div>
              </div>
            </div>
          </div>
          <div class="row ">
            <div class="col-12 ">
              <div class="white_card card_height_100 mb_30 ">
                <div class="white_card_header">
                  <div class="box_header m-0">
                    <div class="main-title">
                      <h3 class="m-0">Reset Password</h3>
                    </div>
                  </div>
                </div>
                <div class="white_card_body">
                  <div class="row  ">
                    <div class="col-lg-12">
                      <div class="common_input mb_15 col-sm-6">
                        <label htmlFor="newPassword">New Password:</label>
                        <input
                          type="password"
                          id="newPassword"
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <div class="common_input mb_15 col-sm-6">
                        <label htmlFor="confirmNewPassword">
                          Confirm New Password:
                        </label>
                        <input
                          type="password"
                          id="confirmNewPassword"
                          name="confirmNewPassword"
                          value={formData.confirmNewPassword}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="white_card_footer text-center">
                  <button type="submit" class="btn_1">
                    Reset Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
export default ResetPwdUser;
