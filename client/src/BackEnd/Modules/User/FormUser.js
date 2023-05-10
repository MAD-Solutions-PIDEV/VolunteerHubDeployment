import React from 'react'
function FormUser() {
  return (
    <div class="main_content_iner overly_inner ">
    <div class="container-fluid p-0 ">

		<div class="row">
			<div class="col-12">
				<div class="page_title_box d-flex flex-wrap align-items-center justify-content-between">
					<div class="page_title_left d-flex align-items-center">
						<h3 class="f_s_25 f_w_700 dark_text mr_30">Dashboard</h3>
						<ol class="breadcrumb page_bradcam mb-0">
							<li class="breadcrumb-item"><a href="javascript:void(0);">Home</a></li>
							<li class="breadcrumb-item active">Analytic</li>
						</ol>
					</div>
					<div class="page_title_right">
						<div class="page_date_button d-flex align-items-center">
							<img src={process.env.PUBLIC_URL +"/assets/img/icon/calender_icon.svg"}  alt=""/>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-12">
				<div class="white_card card_height_100 mb_30">
					<div class="white_card_header">
						<div class="box_header m-0">
							<div class="main-title">
								<h3 class="m-0">Add New User </h3>
							</div>
						</div>
					</div>
					<div class="white_card_body">
						<div class="row">
							<div class="col-lg-6">
								<div class="common_input mb_15">
									<input type="text" placeholder="Username"/>
								</div>
							</div>
							<div class="col-lg-6">
								<div class="common_input mb_15">
									<input type="text" placeholder="First Name"/>
								</div>
							</div>
							<div class="col-lg-6">
								<div class="common_input mb_15">
									<input type="text" placeholder="Last Name"/>
								</div>
							</div>
							<div class="col-lg-6">
								<div class="common_input mb_15">
									<input type="text" placeholder="Email Address"/>
								</div>
							</div>
							<div class="col-lg-6">
								<div class="common_input mb_15">
									<input type="text" placeholder="Mobile No"/>
								</div>
							</div>
							<div class="col-lg-6">
								<div class="common_input mb_15">
									<input type="text" placeholder="Password"/>
								</div>
							</div>
							<div class="col-lg-6">
								<div class="common_input mb_15">
									<input type="text" placeholder="Email"/>
								</div>
							</div>
							<div class="col-12">
								<div class="create_report_btn mt_30">
									<a href="#" class="btn_1 radius_btn d-block text-center">Add User</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
    </div>
  )
}

export default FormUser