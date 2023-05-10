# VolunteerHub
client side

## Run server
`cd client`
`npm start`

## Documentation
### Two directory 
src/BackEnd/~ : that contain file 
- src/BackEnd/Layout/Dashboard.js : call components using `<oulet />` ,Sidebar and header are fixed at the same file 
- src/BackEnd/Modules : must have all the modules every module should have a directory containing all the required files.js
#### Example (User) :
- src/BackEnd/Modules/User/add.js
- src/BackEnd/Modules/User/list.js
- src/BackEnd/Modules/User/update.js

### Routes
src/routes.js :
One file that contain both back and front components
#### FrontEnd "/"
example : `<Route path="" element={<Home />} />`
all components in /src/components
<!> Don't edit the components file directly make a copy in the desired place then you can edit <!/>
#### BackEnd "/dashboard/~"
example : `/dashboard/users/list`
declaration inside src/routes.js:
        `<Route path="/dashboard" element={<Dashboard />} >
              <Route path="users/">
                <Route path="list" element={<ListUser />}/>
              </Route>
        </Route>`

#### Port 3000
