// import React from "react";
// // import { selected } from "../objects/TableSettingsObjects";
// import { deploy_api, port_server, test_api } from "../ServerVariable";
// import { setContentFile } from "../objects/ObjectsContentFile";
// import { contentXML, contentXMLStart, setContentFileXML, setContentFileXMLEdit } from "../objects/ObjectsContentFileXML";
// import { Button, ButtonGroup, ClickAwayListener, Grow, IconButton, MenuItem, MenuList, Paper, Popper, Toolbar, Tooltip, Typography, alpha } from "@mui/material";
// import { CloudUpload, FolderZip, NoteAdd, OpenInBrowser, Delete, ArrowDropDown } from "@mui/icons-material";
// import { setOpenPDFFile } from "../objects/OpenPDFFile";
// import { setOpenWordFile } from "../objects/OpenWordFile";
// import { setOpen } from "../objects/Open";

// export const EnhancedTableToolbar = (
//     props: EnhancedTableToolbarProps,
//     openXML: EnhancedTableToolbarProps
// ) => {
//     const { numSelected } = props;
//     const options = ['Просмотр', 'Просмотреть как PDF', 'Просмотреть как XML', 'Просмотреть как Word файл'];    
//     const [open, setOpen_1] = React.useState(false);
//     const anchorRef = React.useRef<HTMLDivElement>(null);
//     const [selectedIndex, setSelectedIndex] = React.useState(1);

//     const handleClick = () => {
//         console.info(`You clicked ${options[selectedIndex]}`);
//         if (options[selectedIndex] === "Просмотреть как PDF") {
//             setOpenPDFFile(true)
//             selected.map((id) => {
//                 fetch(deploy_api+port_server+`/file/read/PDF/${localStorage.getItem('NameCompany')}/${id}`, {
//                     method: 'GET',
//                     headers: {
//                         "Accept": "application/json",
//                         "Authorization": `Bearer ${localStorage.getItem('auth_token')}`,
//                         'Content-Type': 'application/json',
//                         'Connection': 'keep-alive',
//                         'Accept-Encoding': 'gzip, deflate, br',
//                         'Cache-Control': 'no-cache'
//                     }
//                 })
//                     .then((response) => response.json())
//                     .then((data) => setContentFile(data))
//                     .catch((error) => console.log(error))
//             })
//         }

//         else if (options[selectedIndex] === "Просмотреть как XML") {
//             openXML(true)
//             selected.map((id) => {
//                 fetch(test_api+port_server+`/file/read/XML/${localStorage.getItem('NameCompany')}/${id}`, {
//                     method: 'GET',
//                     headers: {
//                         "Accept": "application/json",
//                         "Authorization": `Bearer ${localStorage.getItem('auth_token')}`,
//                         'Content-Type': 'application/json',
//                         'Connection': 'keep-alive',
//                         'Accept-Encoding': 'gzip, deflate, br',
//                         'Cache-Control': 'no-cache'
//                     }
//                 })
//                     .then((response) => response.json())
//                     .then(data => {
//                         setContentFile(data[0]["name_file"])
//                         for (let i = 0; i < data[0]["content_file"].length; i++) {
//                             contentXML.push(data[0]["content_file"][i])
//                             for (let j = 1; j < data[0]["content_file"][i].length; j++) {
//                                 contentXMLStart.push(data[0]["content_file"][j])
//                                 setContentFileXMLEdit(contentXMLStart)
//                             }
//                             setContentFileXML(contentXML)
//                         }   
//                     })
//                     .catch((error) => console.log(error))
//             })
//         }

//         else if (options[selectedIndex] === "Просмотреть как Word файл") {
//             setOpenWordFile(true)
//             selected.map((id) => {
//                 fetch(test_api+port_server+`/file/read/${localStorage.getItem('NameCompany')}/${id}`, {
//                     method: 'GET',
//                     headers: {
//                         "Accept": "application/json",
//                         "Authorization": `Bearer ${localStorage.getItem('auth_token')}`,
//                         'Content-Type': 'application/json',
//                         'Connection': 'keep-alive',
//                         'Accept-Encoding': 'gzip, deflate, br',
//                         'Cache-Control': 'no-cache'
//                     }
//                 })
//                     .then((response) => response.json())
//                     .then((data) => setContentFile(data))
//                     .catch((error) => console.log(error))
//             })
//         }
//     };

//     const handleMenuItemClick = (
//         event: React.MouseEvent<HTMLLIElement, MouseEvent>,
//         index: number,
//     ) => {
//         setSelectedIndex(index);
//         setOpen_1(false);
//     };

//     const handleToggle = () => {
//         setOpen_1((prevOpen) => !prevOpen);
//     };

//     const handleClose = (event: Event) => {
//         if (
//             anchorRef.current 
//             &&
//             anchorRef.current.contains(event.target as HTMLElement)
//         ) {return;}
//         setOpen_1(false);
//     };

//     return (
//         <Toolbar
//             sx={{
//                 pl: { sm: 2 },
//                 pr: { xs: 1, sm: 1 },
//                 ...(numSelected > 0 && {
//                     bgcolor: (theme) =>
//                         alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
//                 }),
//             }}
//         >
//             {numSelected > 0 && foundFile === true ? 
//                 (<Typography
//                     sx={{ flex: '1 1 100%' }}
//                     color="inherit"
//                     variant="subtitle1"
//                     component="div"
//                 >
//                     {numSelected === 1 ? <>
//                         1 выбран
//                     </> : <>
//                         {numSelected} выбрано
//                     </>
//                     }
//                 </Typography>)
//             : 
                 
//                     <Typography
//                         sx={{ flex: '1 1 100%' }}
//                         variant="h6"
//                         id="tableTitle"
//                         component="div"
//                     >
//                         Файлы
//                     </Typography>
//             }
//             {numSelected > 0 ? (
//                 <> {numSelected === 1 ? <>
//                     <Tooltip title="Собрать пакет документов" onClick={() => {
//                         console.info('create packet of document')
//                     }}>
//                         <IconButton>
//                             <FolderZip />
//                         </IconButton>
//                     </Tooltip>

//                     <Tooltip title="Открыть в браузере" onClick={() => {
//                         selected.map((id) => {
//                             setOpen(true)
//                             fetch(deploy_api+port_server+`/file/read/${localStorage.getItem('NameCompany')}/${id}`, {
//                                 method: 'GET',
//                                 headers: {
//                                     "Accept": "application/json",
//                                     "Authorization": `Bearer ${localStorage.getItem('auth_token')}`,
//                                     'Content-Type': 'application/json',
//                                     'Connection': 'keep-alive',
//                                     'Accept-Encoding': 'gzip, deflate, br',
//                                     'Cache-Control': 'no-cache'
//                                 }
//                             })
//                                 .then((response) => response.json())
//                                 .then((data) => setContentFile(data))
//                                 .catch((error) => console.log(error))
//                         })
//                     }}>
//                         <IconButton>
//                             <OpenInBrowser />
//                         </IconButton>
//                     </Tooltip>

//                     <>
//                         <IconButton>
//                             <React.Fragment>
//                                 <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
//                                     <Button onClick={handleClick} style={{textTransform:'none'}}>{options[selectedIndex]}</Button>
//                                     <Button
//                                     size="small"
//                                     aria-controls={open ? 'split-button-menu' : undefined}
//                                     aria-expanded={open ? 'true' : undefined}
//                                     aria-label="select merge strategy"
//                                     aria-haspopup="menu"
//                                     onClick={handleToggle}
//                                     >
//                                     <ArrowDropDown />
//                                     </Button>
//                                 </ButtonGroup>
//                                 <Popper
//                                     sx={{
//                                     zIndex: 1,
//                                     }}
//                                     open={open}
//                                     anchorEl={anchorRef.current}
//                                     role={undefined}
//                                     transition
//                                     disablePortal
//                                 >
//                                     {({ TransitionProps, placement }) => (
//                                     <Grow
//                                         {...TransitionProps}
//                                         style={{
//                                         transformOrigin:
//                                             placement === 'bottom' ? 'center top' : 'center bottom',
//                                         }}
//                                     >
//                                         <Paper>
//                                         <ClickAwayListener onClickAway={handleClose}>
//                                             <MenuList id="split-button-menu" autoFocusItem>
//                                             {options.map((option, index) => (
//                                                 <MenuItem
//                                                 key={option}
//                                                 disabled={index==0}
//                                                 selected={index === selectedIndex}
//                                                 onClick={(event) => handleMenuItemClick(event, index)}
//                                                 >
//                                                 {option}
//                                                 </MenuItem>
//                                             ))}
//                                             </MenuList>
//                                         </ClickAwayListener>
//                                         </Paper>
//                                     </Grow>
//                                     )}
//                                 </Popper>
//                             </React.Fragment>
//                         </IconButton>
//                     </>

//                     <Tooltip title="Удалить" onClick={() => {
//                         // selected.map(select => {
//                             fetch(deploy_api+port_server+`/file/delete/file/${localStorage.getItem('NameCompany')}/${select}`, {
//                                 method: 'DELETE',
//                                 headers: {
//                                     "Accept": "*/*",
//                                     "Authorization": `Bearer ${localStorage.getItem('auth_token')}`,
//                                     'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
//                                     'Connection': 'keep-alive',
//                                     'Accept-Encoding': 'gzip, deflate, br',
//                                     'Cache-Control': 'no-cache'
//                                 }
//                             })
//                             .then((resp) => {
//                                 if (typeof resp.status === "string") {
//                                     if (resp.status === "200") {
//                                         window.location.reload()
//                                     }
//                                 }

//                                 else if (typeof resp.status === "number") {
//                                     if (resp.status === 200) {
//                                         window.location.reload()
//                                     }
//                                 }

//                                 else {
//                                     console.log("Возможно произошло изменение на сервире и фронт его пока ещё не подтянул")
//                                 }
//                             })
//                             .catch((error) => {
//                                 console.log(error)
//                             })
//                         })
//                     }}>
//                         <IconButton>
//                             <Delete />
//                         </IconButton>
//                     </Tooltip>
//                 </> : <>
//                     <Tooltip title="Собрать пакет документов" onClick={() => {
//                         console.info('create packet of document')
//                     }}>
//                         <IconButton>
//                             <FolderZip />
//                         </IconButton>
//                     </Tooltip>
//                     <Tooltip title="Удалить" onClick={() => {
//                         console.info('delete')
//                     }}>
//                         <IconButton>
//                             <Delete />
//                         </IconButton>
//                     </Tooltip>
//                 </>}
//                 </>
//             ) : (
//                 <>    
//                     <Tooltip title="Создать" onClick={() => {window.open(`/home/company/create/file`, '_self')}}>
//                         <IconButton>
//                             <NoteAdd />
//                         </IconButton>
//                     </Tooltip>

//                     <Tooltip title="Загрузить" onClick={() => {window.open(`/home/company/upload/file`, '_self')}}>
//                         <IconButton>
//                             <CloudUpload />
//                         </IconButton>
//                     </Tooltip>
//                 </>
//             )}
//         </Toolbar>
//     );
// }