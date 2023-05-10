import React from 'react'

 const Content = () => {
  return (
    

		<div className="main_content_iner overly_inner ">
			<div className="container-fluid p-0 ">

				<div className="row">
					<div className="col-12">
						<div className="page_title_box d-flex flex-wrap align-items-center justify-content-between">
							<div className="page_title_left d-flex align-items-center">
								<h3 className="f_s_25 f_w_700 dark_text mr_30">Dashboard</h3>
								<ol className="breadcrumb page_bradcam mb-0">
									<li className="breadcrumb-item"><a href="javascript:void(0);">Home</a></li>
									<li className="breadcrumb-item active">Analytic</li>
								</ol>
							</div>
							<div className="page_title_right">
								<div className="page_date_button d-flex align-items-center">
									<img src={process.env.PUBLIC_URL +"img/icon/calender_icon.svg" } alt=""/>
									August 1, 2020 - August 31, 2020
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row ">
					<div className="col-xl-4">
						<div className="white_card card_height_100 mb_30">
							<div className="white_card_header">
								<div className="row align-items-center">
									<div className="col-lg-4">
										<div className="main-title">
											<h3 className="m-0">New Users</h3>
										</div>
									</div>
									<div className="col-lg-8">
										<div className="row justify-content-end">
											<div className="col-lg-8 d-flex justify-content-end">
												<div className="serach_field-area theme_bg d-flex align-items-center">
													<div className="search_inner">
														<form action="#">
															<div className="search_field">
																<input type="text" placeholder="Search"/>
															</div>
															<button type="submit"> <img src={process.env.PUBLIC_URL +"img/icon/icon_search.svg" } alt=""/> </button>
														</form>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="row justify-content-end">
									<div className="col-lg-4 mt_20">
										<select className="nice_Select2 wide">
											<option value="1">Show by All</option>
											<option value="1">Show by A</option>
											<option value="1">Show by B</option>
										</select>
									</div>
								</div>
							</div>
							<div className="white_card_body ">
								<div className="single_user_pil d-flex align-items-center justify-content-between">
									<div className="user_pils_thumb d-flex align-items-center">
										<div className="thumb_34 mr_15 mt-0"><img className="img-fluid radius_50" src={process.env.PUBLIC_URL +"/assets/img/customers/1.png" } alt=""/></div>
										<span className="f_s_14 f_w_400 text_color_11">Jhon Smith</span>
									</div>
									<div className="user_info">
										Customer
									</div>
									<div className="action_btns d-flex">
										<a href="#" className="action_btn mr_10"> <i className="far fa-edit"></i> </a>
										<a href="#" className="action_btn"> <i className="fas fa-trash"></i> </a>
									</div>
								</div>
								<div className="single_user_pil admin_bg d-flex align-items-center justify-content-between">
									<div className="user_pils_thumb d-flex align-items-center">
										<div className="thumb_34 mr_15 mt-0"><img className="img-fluid radius_50" src={process.env.PUBLIC_URL +"/assets/img/customers/1.png" } alt=""/></div>
										<span className="f_s_14 f_w_400 text_color_11">Jhon Smith</span>
									</div>
									<div className="user_info">
										Admin
									</div>
									<div className="action_btns d-flex">
										<a href="#" className="action_btn mr_10"> <i className="far fa-edit"></i> </a>
										<a href="#" className="action_btn"> <i className="fas fa-trash"></i> </a>
									</div>
								</div>
								<div className="single_user_pil d-flex align-items-center justify-content-between">
									<div className="user_pils_thumb d-flex align-items-center">
										<div className="thumb_34 mr_15 mt-0"><img className="img-fluid radius_50" src={process.env.PUBLIC_URL +"/assets/img/customers/1.png" } alt=""/></div>
										<span className="f_s_14 f_w_400 text_color_11">Jhon Smith</span>
									</div>
									<div className="user_info">
										Customer
									</div>
									<div className="action_btns d-flex">
										<a href="#" className="action_btn mr_10"> <i className="far fa-edit"></i> </a>
										<a href="#" className="action_btn"> <i className="fas fa-trash"></i> </a>
									</div>
								</div>
								<div className="single_user_pil d-flex align-items-center justify-content-between">
									<div className="user_pils_thumb d-flex align-items-center">
										<div className="thumb_34 mr_15 mt-0"><img className="img-fluid radius_50" src={process.env.PUBLIC_URL +"/assets/img/customers/1.png" } alt=""/></div>
										<span className="f_s_14 f_w_400 text_color_11">Jhon Smith</span>
									</div>
									<div className="user_info">
										Customer
									</div>
									<div className="action_btns d-flex">
										<a href="#" className="action_btn mr_10"> <i className="far fa-edit"></i> </a>
										<a href="#" className="action_btn"> <i className="fas fa-trash"></i> </a>
									</div>
								</div>
								<div className="single_user_pil d-flex align-items-center justify-content-between mb-0">
									<div className="user_pils_thumb d-flex align-items-center">
										<div className="thumb_34 mr_15 mt-0"><img className="img-fluid radius_50" src={process.env.PUBLIC_URL +"/assets/img/customers/1.png" } alt=""/></div>
										<span className="f_s_14 f_w_400 text_color_11">Jhon Smith</span>
									</div>
									<div className="user_info">
										Customer
									</div>
									<div className="action_btns d-flex">
										<a href="#" className="action_btn mr_10"> <i className="far fa-edit"></i> </a>
										<a href="#" className="action_btn"> <i className="fas fa-trash"></i> </a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-4">
						<div className="white_card card_height_100 mb_30">
							<div className="white_card_header">
								<div className="box_header m-0">
									<div className="main-title">
										<h3 className="m-0">Sales of the last week</h3>
									</div>
									<div className="header_more_tool">
										<div className="dropdown">
											<span className="dropdown-toggle" id="dropdownMenuButton" data-bs-toggle="dropdown">
												<i className="ti-more-alt"></i>
											</span>
											<div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
												<a className="dropdown-item" href="#"> <i className="ti-eye"></i> Action</a>
												<a className="dropdown-item" href="#"> <i className="ti-trash"></i> Delete</a>
												<a className="dropdown-item" href="#"> <i className="fas fa-edit"></i> Edit</a>
												<a className="dropdown-item" href="#"> <i className="ti-printer"></i> Print</a>
												<a className="dropdown-item" href="#"> <i className="fa fa-download"></i> Download</a>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="white_card_body">
								<div id="chart-currently"></div>
								<div className="monthly_plan_wraper">
									<div className="single_plan d-flex align-items-center justify-content-between">
										<div className="plan_left d-flex align-items-center">
											<div className="thumb">
												<img src={process.env.PUBLIC_URL +"img/icon2/7.svg" } alt=""/>
											</div>
											<div>
												<h5>Most Sales</h5>
												<span>Authors with the best sales</span>
											</div>
										</div>
									</div>
									<div className="single_plan d-flex align-items-center justify-content-between">
										<div className="plan_left d-flex align-items-center">
											<div className="thumb">
												<img src={process.env.PUBLIC_URL +"img/icon2/6.svg" } alt=""/>
											</div>
											<div>
												<h5>Total sales lead</h5>
												<span>40% increased on week-to-week reports</span>
											</div>
										</div>
									</div>
									<div className="single_plan d-flex align-items-center justify-content-between">
										<div className="plan_left d-flex align-items-center">
											<div className="thumb">
												<img src={process.env.PUBLIC_URL +"img/icon2/5.svg" } alt=""/>
											</div>
											<div>
												<h5>Average Bestseller</h5>
												<span>Pitstop Email Marketing</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-4">
						<div className="white_card card_height_100 mb_30 overflow_hidden">
							<div className="white_card_header">
								<div className="box_header m-0">
									<div className="main-title">
										<h3 className="m-0">Sales Details</h3>
									</div>
									<div className="header_more_tool">
										<div className="dropdown">
											<span className="dropdown-toggle" id="dropdownMenuButton" data-bs-toggle="dropdown">
												<i className="ti-more-alt"></i>
											</span>
											<div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
												<a className="dropdown-item" href="#"> <i className="ti-eye"></i> Action</a>
												<a className="dropdown-item" href="#"> <i className="ti-trash"></i> Delete</a>
												<a className="dropdown-item" href="#"> <i className="fas fa-edit"></i> Edit</a>
												<a className="dropdown-item" href="#"> <i className="ti-printer"></i> Print</a>
												<a className="dropdown-item" href="#"> <i className="fa fa-download"></i> Download</a>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="white_card_body pb-0">
								<div className="Sales_Details_plan">
									<div className="row">
										<div className="col-lg-6">
											<div className="single_plan d-flex align-items-center justify-content-between">
												<div className="plan_left d-flex align-items-center">
													<div className="thumb">
														<img src={process.env.PUBLIC_URL +"img/icon2/3.svg" } alt=""/>
													</div>
													<div>
														<h5>$2,034</h5>
														<span>Author Sales</span>
													</div>
												</div>
											</div>
										</div>
										<div className="col-lg-6">
											<div className="single_plan d-flex align-items-center justify-content-between">
												<div className="plan_left d-flex align-items-center">
													<div className="thumb">
														<img src={process.env.PUBLIC_URL +"img/icon2/1.svg" } alt=""/>
													</div>
													<div>
														<h5>$706</h5>
														<span>Commision</span>
													</div>
												</div>
											</div>
										</div>
										<div className="col-lg-6">
											<div className="single_plan d-flex align-items-center justify-content-between">
												<div className="plan_left d-flex align-items-center">
													<div className="thumb">
														<img src={process.env.PUBLIC_URL +"img/icon2/4.svg" } alt=""/>
													</div>
													<div>
														<h5>$49</h5>
														<span>Average Bid</span>
													</div>
												</div>
											</div>
										</div>
										<div className="col-lg-6">
											<div className="single_plan d-flex align-items-center justify-content-between">
												<div className="plan_left d-flex align-items-center">
													<div className="thumb">
														<img src={process.env.PUBLIC_URL +"img/icon2/2.svg" } alt=""/>
													</div>
													<div>
														<h5>$5.8M</h5>
														<span>All Time Sales</span>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="chart_wrap overflow_hidden">
								<div id="chart4"></div>
							</div>
						</div>
					</div>
					<div className="col-xl-8 ">
						<div className="white_card mb_30 card_height_100">
							<div className="white_card_header">
								<div className="row align-items-center justify-content-between flex-wrap">
									<div className="col-lg-4">
										<div className="main-title">
											<h3 className="m-0">Stoke Details</h3>
										</div>
									</div>
									<div className="col-lg-4 text-end d-flex justify-content-end">
										<select className="nice_Select2 max-width-220">
											<option value="1">Show by month</option>
											<option value="1">Show by year</option>
											<option value="1">Show by day</option>
										</select>
									</div>
								</div>
							</div>
							<div className="white_card_body">
								<div id="management_bar"></div>
							</div>
						</div>
					</div>
					<div className="col-xl-4 ">
						<div className="white_card card_height_100 mb_30 user_crm_wrapper">
							<div className="row">
								<div className="col-lg-6">
									<div className="single_crm">
										<div className="crm_head d-flex align-items-center justify-content-between">
											<div className="thumb">
												<img src={process.env.PUBLIC_URL +"img/crm/businessman.svg" } alt=""/>
											</div>
											<i className="fas fa-ellipsis-h f_s_11 white_text"></i>
										</div>
										<div className="crm_body">
											<h4>2455</h4>
											<p>User Registrations</p>
										</div>
									</div>
								</div>
								<div className="col-lg-6">
									<div className="single_crm ">
										<div className="crm_head crm_bg_1 d-flex align-items-center justify-content-between">
											<div className="thumb">
												<img src={process.env.PUBLIC_URL +"img/crm/customer.svg" } alt=""/>
											</div>
											<i className="fas fa-ellipsis-h f_s_11 white_text"></i>
										</div>
										<div className="crm_body">
											<h4>2455</h4>
											<p>User Registrations</p>
										</div>
									</div>
								</div>
								<div className="col-lg-6">
									<div className="single_crm">
										<div className="crm_head crm_bg_2 d-flex align-items-center justify-content-between">
											<div className="thumb">
												<img src={process.env.PUBLIC_URL +"img/crm/infographic.svg" } alt=""/>
											</div>
											<i className="fas fa-ellipsis-h f_s_11 white_text"></i>
										</div>
										<div className="crm_body">
											<h4>2455</h4>
											<p>User Registrations</p>
										</div>
									</div>
								</div>
								<div className="col-lg-6">
									<div className="single_crm">
										<div className="crm_head crm_bg_3 d-flex align-items-center justify-content-between">
											<div className="thumb">
												<img src={process.env.PUBLIC_URL +"img/crm/sqr.svg" } alt=""/>
											</div>
											<i className="fas fa-ellipsis-h f_s_11 white_text"></i>
										</div>
										<div className="crm_body">
											<h4>2455</h4>
											<p>User Registrations</p>
										</div>
									</div>
								</div>
							</div>
							<div className="crm_reports_bnner">
								<div className="row justify-content-end ">
									<div className="col-lg-6">
										<h4>Create CRM Reports</h4>
										<p>Outlines keep you and honest
										indulging honest.</p>
										<a href="#">Read More <i className="fas fa-arrow-right"></i> </a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-lg-4">
						<div className="white_card card_height_100 mb_20 ">
							<div className="white_card_header">
								<div className="box_header m-0">
									<div className="main-title">
										<h3 className="m-0">Stoke Details</h3>
									</div>
									<div className="header_more_tool">
										<div className="dropdown">
											<span className="dropdown-toggle" id="dropdownMenuButton" data-bs-toggle="dropdown">
												<i className="ti-more-alt"></i>
											</span>
											<div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
												<a className="dropdown-item" href="#"> <i className="ti-eye"></i> Action</a>
												<a className="dropdown-item" href="#"> <i className="ti-trash"></i> Delete</a>
												<a className="dropdown-item" href="#"> <i className="fas fa-edit"></i> Edit</a>
												<a className="dropdown-item" href="#"> <i className="ti-printer"></i> Print</a>
												<a className="dropdown-item" href="#"> <i className="fa fa-download"></i> Download</a>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="white_card_body QA_section">
								<div className="QA_table ">

									<table className="table lms_table_active2 p-0">
										<thead>
											<tr>
												<th scope="col">Product Name</th>
												<th scope="col">Market Price</th>
												<th scope="col">Selling Price</th>
												<th scope="col">Total Unite</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>
													<div className="customer d-flex align-items-center">
														<div className="thumb_34 mr_15 mt-0"><img className="img-fluid radius_50" src={process.env.PUBLIC_URL +"/assets/img/customers/pro_1.png" } alt=""/></div>
														<span className="f_s_12 f_w_600 color_text_5">Product 1</span>
													</div>
												</td>
												<td className="f_s_12 f_w_400 color_text_6">$564</td>
												<td className="f_s_12 f_w_400 color_text_6">$650</td>
												<td className="f_s_12 f_w_400 text-center"><a href="#" className="text_color_1">20</a></td>
											</tr>
											<tr>
												<td>
													<div className="customer d-flex align-items-center">
														<div className="thumb_34 mr_15 mt-0"><img className="img-fluid radius_50" src={process.env.PUBLIC_URL +"/assets/img/customers/pro_2.png" } alt=""/></div>
														<span className="f_s_12 f_w_600 color_text_5">Product 1</span>
													</div>
												</td>
												<td className="f_s_12 f_w_400 color_text_6">$564</td>
												<td className="f_s_12 f_w_400 color_text_6">$650</td>
												<td className="f_s_12 f_w_400 text-center"><a href="#" className="text_color_1">20</a></td>
											</tr>
											<tr>
												<td>
													<div className="customer d-flex align-items-center">
														<div className="thumb_34 mr_15 mt-0"><img className="img-fluid radius_50" src={process.env.PUBLIC_URL +"/assets/img/customers/pro_3.png" } alt=""/></div>
														<span className="f_s_12 f_w_600 color_text_5">Product 1</span>
													</div>
												</td>
												<td className="f_s_12 f_w_400 color_text_6">$564</td>
												<td className="f_s_12 f_w_400 color_text_6">$650</td>
												<td className="f_s_12 f_w_400 text-center"><a href="#" className="text_color_1">20</a></td>
											</tr>
											<tr>
												<td> 
													<div className="customer d-flex align-items-center">
														<div className="thumb_34 mr_15 mt-0"><img className="img-fluid radius_50" src={process.env.PUBLIC_URL +"/assets/img/customers/pro_4.png" } alt=""/></div>
														<span className="f_s_12 f_w_600 color_text_5">Product 1</span>
													</div>
												</td>
												<td className="f_s_12 f_w_400 color_text_6">$564</td>
												<td className="f_s_12 f_w_400 color_text_6">$650</td>
												<td className="f_s_12 f_w_400 text-center"><a href="#" className="color_text_6">210</a></td>
											</tr>
											<tr>
												<td>
													<div className="customer d-flex align-items-center">
														<div className="thumb_34 mr_15 mt-0"><img className="img-fluid radius_50" src={process.env.PUBLIC_URL +"/assets/img/customers/pro_5.png" } alt=""/></div>
														<span className="f_s_12 f_w_600 color_text_5">Product 1</span>
													</div>
												</td>
												<td className="f_s_12 f_w_400 color_text_6">$564</td>
												<td className="f_s_12 f_w_400 color_text_6">$650</td>
												<td className="f_s_12 f_w_400 text-center"><a href="#" className="text_color_1">210</a></td>
											</tr>
											<tr>
												<td>
													<div className="customer d-flex align-items-center">
														<div className="thumb_34 mr_15 mt-0"><img className="img-fluid radius_50" src={process.env.PUBLIC_URL +"/assets/img/customers/pro_6.png" } alt=""/></div>
														<span className="f_s_12 f_w_600 color_text_5">Product 1</span>
													</div>
												</td>
												<td className="f_s_12 f_w_400 color_text_6">$564</td>
												<td className="f_s_12 f_w_400 color_text_6">$650</td>
												<td className="f_s_12 f_w_400 text-center"><a href="#" className="text_color_5">200</a></td>
											</tr>
											<tr>
												<td>
													<div className="customer d-flex align-items-center">
														<div className="thumb_34 mr_15 mt-0"><img className="img-fluid radius_50" src={process.env.PUBLIC_URL +"/assets/img/customers/pro_6.png" } alt=""/></div>
														<span className="f_s_12 f_w_600 color_text_5">Product 1</span>
													</div>
												</td>
												<td className="f_s_12 f_w_400 color_text_6">$564</td>
												<td className="f_s_12 f_w_400 color_text_6">$650</td>
												<td className="f_s_12 f_w_400 text-center"><a href="#" className="text_color_5">200</a></td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-4">
						<div className="white_card card_height_100 mb_30">
							<div className="white_card_header">
								<div className="box_header m-0">
									<div className="main-title">
										<h3 className="m-0">Recent activity</h3>
									</div>
									<div className="header_more_tool">
										<div className="dropdown">
											<span className="dropdown-toggle" id="dropdownMenuButton" data-bs-toggle="dropdown">
												<i className="ti-more-alt"></i>
											</span>
											<div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
												<a className="dropdown-item" href="#"> <i className="ti-eye"></i> Action</a>
												<a className="dropdown-item" href="#"> <i className="ti-trash"></i> Delete</a>
												<a className="dropdown-item" href="#"> <i className="fas fa-edit"></i> Edit</a>
												<a className="dropdown-item" href="#"> <i className="ti-printer"></i> Print</a>
												<a className="dropdown-item" href="#"> <i className="fa fa-download"></i> Download</a>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="white_card_body">
								<div className="Activity_timeline">
									<ul>
										<li>
											<div className="activity_bell"></div>
											<div className="timeLine_inner d-flex align-items-center">
												<div className="activity_wrap">
													<h6>5 min ago</h6>
													<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque
													</p>
												</div>
											</div>
										</li>
										<li>
											<div className="activity_bell "></div>
											<div className="timeLine_inner d-flex align-items-center">
												<div className="activity_wrap">
													<h6>5 min ago</h6>
													<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque
													</p>
												</div>
											</div>
										</li>
										<li>
											<div className="activity_bell bell_lite"></div>
											<div className="timeLine_inner d-flex align-items-center">
												<div className="activity_wrap">
													<h6>5 min ago</h6>
													<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque
													</p>
												</div>
											</div>
										</li>
										<li>
											<div className="activity_bell bell_lite"></div>
											<div className="timeLine_inner d-flex align-items-center">
												<div className="activity_wrap">
													<h6>5 min ago</h6>
													<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque
													</p>
												</div>
											</div>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-4">
						<div className="white_card card_height_100 mb_30">
							<div className="white_card_header">
								<div className="box_header m-0">
									<div className="main-title">
										<h3 className="m-0">Member request
										to mail.</h3>
									</div>
									<div className="header_more_tool">
										<div className="dropdown">
											<span className="dropdown-toggle" id="dropdownMenuButton" data-bs-toggle="dropdown">
												<i className="ti-more-alt"></i>
											</span>
											<div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
												<a className="dropdown-item" href="#"> <i className="ti-eye"></i> Action</a>
												<a className="dropdown-item" href="#"> <i className="ti-trash"></i> Delete</a>
												<a className="dropdown-item" href="#"> <i className="fas fa-edit"></i> Edit</a>
												<a className="dropdown-item" href="#"> <i className="ti-printer"></i> Print</a>
												<a className="dropdown-item" href="#"> <i className="fa fa-download"></i> Download</a>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="white_card_body">
								<div className="thumb mb_30">
									<img src={process.env.PUBLIC_URL +"/assets/img/table.svg"} alt="" className="img-fluid"/>
								</div>
								<div className="common_form">
									<form action="#">
										<div className="row">
											<div className="col-lg-6">
												<div className="common_input mb_15">
													<input type="text" placeholder="First Name"/>
												</div>
											</div>
											<div className="col-lg-6">
												<div className="common_input mb_15">
													<input type="text" placeholder="Last Name"/>
												</div>
											</div>
											<div className="col-lg-12">
												<div className="common_input mb_15">
													<input type="text" placeholder="Email"/>
												</div>
											</div>
											<div className="col-lg-6">
												<select className="nice_Select2 nice_Select_line wide">
													<option value="1">Role</option>
													<option value="1">Role 1</option>
													<option value="1">Role2</option>
												</select>
											</div>
											<div className="col-12">
												<div className="create_report_btn mt_30">
													<a href="#" className="btn_1 radius_btn d-block text-center">Send the invitation link</a>
												</div>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-12">
						<div className="white_card card_height_100 mb_30">
							<div className="white_card_header">
								<div className="row align-items-center">
									<div className="col-lg-4">
										<div className="main-title">
											<h3 className="m-0">Stoke Details</h3>
										</div>
									</div>
									<div className="col-lg-8">
										<div className="row justify-content-end">
											<div className="col-lg-8 d-flex justify-content-end">
												<div className="serach_field-area theme_bg d-flex align-items-center">
													<div className="search_inner">
														<form action="#">
															<div className="search_field">
																<input type="text" placeholder="Search"/>
															</div>
															<button type="submit"> <img src={process.env.PUBLIC_URL +"/assets/img/icon/icon_search.svg" } alt=""/> </button>
														</form>
													</div>
												</div>
											</div>
											<div className="col-lg-2">
												<select className="nice_Select2 wide">
													<option value="1">Show by All</option>
													<option value="1">Show by A</option>
													<option value="1">Show by B</option>
												</select>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="white_card_body ">
								<div className="row min_height_oveflow">
									<div className="col-lg-4 mb_30">
										<div className="single_user_pil d-flex align-items-center justify-content-between">
											<div className="user_pils_thumb d-flex align-items-center">
												<div className="thumb_34 mr_15 mt-0"><img className="img-fluid radius_50" ssrc={process.env.PUBLIC_URL +"/assets/img/customers/1.png" } alt=""/></div>
												<span className="f_s_14 f_w_400 text_color_11">Jhon Smith</span>
											</div>
											<div className="user_info">
												Customer
											</div>
											<div className="action_btns d-flex">
												<a href="#" className="action_btn mr_10"> <i className="far fa-edit"></i> </a>
												<a href="#" className="action_btn"> <i className="fas fa-trash"></i> </a>
											</div>
										</div>
										<div className="single_user_pil admin_bg d-flex align-items-center justify-content-between">
											<div className="user_pils_thumb d-flex align-items-center">
												<div className="thumb_34 mr_15 mt-0"><img className="img-fluid radius_50" src={process.env.PUBLIC_URL +"/assets/img/customers/1.png" } alt=""/></div>
												<span className="f_s_14 f_w_400 text_color_11">Jhon Smith</span>
											</div>
											<div className="user_info">
												Admin
											</div>
											<div className="action_btns d-flex">
												<a href="#" className="action_btn mr_10"> <i className="far fa-edit"></i> </a>
												<a href="#" className="action_btn"> <i className="fas fa-trash"></i> </a>
											</div>
										</div>
										<div className="single_user_pil d-flex align-items-center justify-content-between">
											<div className="user_pils_thumb d-flex align-items-center">
												<div className="thumb_34 mr_15 mt-0"><img className="img-fluid radius_50" src={process.env.PUBLIC_URL +"/assets/img/customers/1.png" } alt=""/></div>
												<span className="f_s_14 f_w_400 text_color_11">Jhon Smith</span>
											</div>
											<div className="user_info">
												Customer
											</div>
											<div className="action_btns d-flex">
												<a href="#" className="action_btn mr_10"> <i className="far fa-edit"></i> </a>
												<a href="#" className="action_btn"> <i className="fas fa-trash"></i> </a>
											</div>
										</div>
										<div className="single_user_pil d-flex align-items-center justify-content-between">
											<div className="user_pils_thumb d-flex align-items-center">
												<div className="thumb_34 mr_15 mt-0"><img className="img-fluid radius_50" src={process.env.PUBLIC_URL +"/assets/img/customers/1.png" } alt=""/></div>
												<span className="f_s_14 f_w_400 text_color_11">Jhon Smith</span>
											</div>
											<div className="user_info">
												Customer
											</div>
											<div className="action_btns d-flex">
												<a href="#" className="action_btn mr_10"> <i className="far fa-edit"></i> </a>
												<a href="#" className="action_btn"> <i className="fas fa-trash"></i> </a>
											</div>
										</div>
										<div className="single_user_pil d-flex align-items-center justify-content-between">
											<div className="user_pils_thumb d-flex align-items-center">
												<div className="thumb_34 mr_15 mt-0"><img className="img-fluid radius_50" src={process.env.PUBLIC_URL +"/assets/img/customers/1.png" } alt=""/></div>
												<span className="f_s_14 f_w_400 text_color_11">Jhon Smith</span>
											</div>
											<div className="user_info">
												Customer
											</div>
											<div className="action_btns d-flex">
												<a href="#" className="action_btn mr_10"> <i className="far fa-edit"></i> </a>
												<a href="#" className="action_btn"> <i className="fas fa-trash"></i> </a>
											</div>
										</div>
									</div>
									<div className="col-lg-4 mb_30">
										<div className="single_user_pil d-flex align-items-center justify-content-between">
											<div className="user_pils_thumb d-flex align-items-center">
												<div className="thumb_34 mr_15 mt-0"><img className="img-fluid radius_50" src={process.env.PUBLIC_URL +"/assets/img/customers/1.png" } alt=""/></div>
												<span className="f_s_14 f_w_400 text_color_11">Jhon Smith</span>
											</div>
											<div className="user_info">
												Customer
											</div>
											<div className="action_btns d-flex">
												<a href="#" className="action_btn mr_10"> <i className="far fa-edit"></i> </a>
												<a href="#" className="action_btn"> <i className="fas fa-trash"></i> </a>
											</div>
										</div>
										<div className="single_user_pil admin_bg d-flex align-items-center justify-content-between">
											<div className="user_pils_thumb d-flex align-items-center">
												<div className="thumb_34 mr_15 mt-0"><img className="img-fluid radius_50" src={process.env.PUBLIC_URL +"/assets/img/customers/1.png" } alt=""/></div>
												<span className="f_s_14 f_w_400 text_color_11">Jhon Smith</span>
											</div>
											<div className="user_info">
												Admin
											</div>
											<div className="action_btns d-flex">
												<a href="#" className="action_btn mr_10"> <i className="far fa-edit"></i> </a>
												<a href="#" className="action_btn"> <i className="fas fa-trash"></i> </a>
											</div>
										</div>
										<div className="single_user_pil d-flex align-items-center justify-content-between">
											<div className="user_pils_thumb d-flex align-items-center">
												<div className="thumb_34 mr_15 mt-0"><img className="img-fluid radius_50" src={process.env.PUBLIC_URL +"/assets/img/customers/1.png" } alt=""/></div>
												<span className="f_s_14 f_w_400 text_color_11">Jhon Smith</span>
											</div>
											<div className="user_info">
												Customer
											</div>
											<div className="action_btns d-flex">
												<a href="#" className="action_btn mr_10"> <i className="far fa-edit"></i> </a>
												<a href="#" className="action_btn"> <i className="fas fa-trash"></i> </a>
											</div>
										</div>
										<div className="single_user_pil d-flex align-items-center justify-content-between">
											<div className="user_pils_thumb d-flex align-items-center">
												<div className="thumb_34 mr_15 mt-0"><img className="img-fluid radius_50" src={process.env.PUBLIC_URL +"/assets/img/customers/1.png" } alt=""/></div>
												<span className="f_s_14 f_w_400 text_color_11">Jhon Smith</span>
											</div>
											<div className="user_info">
												Customer
											</div>
											<div className="action_btns d-flex">
												<a href="#" className="action_btn mr_10"> <i className="far fa-edit"></i> </a>
												<a href="#" className="action_btn"> <i className="fas fa-trash"></i> </a>
											</div>
										</div>
										<div className="single_user_pil d-flex align-items-center justify-content-between">
											<div className="user_pils_thumb d-flex align-items-center">
												<div className="thumb_34 mr_15 mt-0"><img className="img-fluid radius_50" src={process.env.PUBLIC_URL +"/assets/img/customers/1.png" } alt=""/></div>
												<span className="f_s_14 f_w_400 text_color_11">Jhon Smith</span>
											</div>
											<div className="user_info">
												Customer
											</div>
											<div className="action_btns d-flex">
												<a href="#" className="action_btn mr_10"> <i className="far fa-edit"></i> </a>
												<a href="#" className="action_btn"> <i className="fas fa-trash"></i> </a>
											</div>
										</div>
									</div>
									<div className="col-lg-4 mb_30">
										<div className="single_user_pil d-flex align-items-center justify-content-between">
											<div className="user_pils_thumb d-flex align-items-center">
												<div className="thumb_34 mr_15 mt-0"><img className="img-fluid radius_50" src={process.env.PUBLIC_URL +"/assets/img/customers/1.png" } alt=""/></div>
												<span className="f_s_14 f_w_400 text_color_11">Jhon Smith</span>
											</div>
											<div className="user_info">
												Customer
											</div>
											<div className="action_btns d-flex">
												<a href="#" className="action_btn mr_10"> <i className="far fa-edit"></i> </a>
												<a href="#" className="action_btn"> <i className="fas fa-trash"></i> </a>
											</div>
										</div>
										<div className="single_user_pil admin_bg d-flex align-items-center justify-content-between">
											<div className="user_pils_thumb d-flex align-items-center">
												<div className="thumb_34 mr_15 mt-0"><img className="img-fluid radius_50" src={process.env.PUBLIC_URL +"/assets/img/customers/1.png" } alt=""/></div>
												<span className="f_s_14 f_w_400 text_color_11">Jhon Smith</span>
											</div>
											<div className="user_info">
												Admin
											</div>
											<div className="action_btns d-flex">
												<a href="#" className="action_btn mr_10"> <i className="far fa-edit"></i> </a>
												<a href="#" className="action_btn"> <i className="fas fa-trash"></i> </a>
											</div>
										</div>
										<div className="single_user_pil d-flex align-items-center justify-content-between">
											<div className="user_pils_thumb d-flex align-items-center">
												<div className="thumb_34 mr_15 mt-0"><img className="img-fluid radius_50" src={process.env.PUBLIC_URL +"/assets/img/customers/1.png" } alt=""/></div>
												<span className="f_s_14 f_w_400 text_color_11">Jhon Smith</span>
											</div>
											<div className="user_info">
												Customer
											</div>
											<div className="action_btns d-flex">
												<a href="#" className="action_btn mr_10"> <i className="far fa-edit"></i> </a>
												<a href="#" className="action_btn"> <i className="fas fa-trash"></i> </a>
											</div>
										</div>
										<div className="single_user_pil d-flex align-items-center justify-content-between">
											<div className="user_pils_thumb d-flex align-items-center">
												<div className="thumb_34 mr_15 mt-0"><img className="img-fluid radius_50" src={process.env.PUBLIC_URL +"/assets/img/customers/1.png" } alt=""/></div>
												<span className="f_s_14 f_w_400 text_color_11">Jhon Smith</span>
											</div>
											<div className="user_info">
												Customer
											</div>
											<div className="action_btns d-flex">
												<a href="#" className="action_btn mr_10"> <i className="far fa-edit"></i> </a>
												<a href="#" className="action_btn"> <i className="fas fa-trash"></i> </a>
											</div>
										</div>
										<div className="single_user_pil d-flex align-items-center justify-content-between">
											<div className="user_pils_thumb d-flex align-items-center">
												<div className="thumb_34 mr_15 mt-0"><img className="img-fluid radius_50" src={process.env.PUBLIC_URL +"/assets/img/customers/1.png" } alt=""/></div>
												<span className="f_s_14 f_w_400 text_color_11">Jhon Smith</span>
											</div>
											<div className="user_info">
												Customer
											</div>
											<div className="action_btns d-flex">
												<a href="#" className="action_btn mr_10"> <i className="far fa-edit"></i> </a>
												<a href="#" className="action_btn"> <i className="fas fa-trash"></i> </a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		
	
)}

export default Content;