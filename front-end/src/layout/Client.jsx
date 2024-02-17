
import { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './layout.css'
import {
  Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem,
  Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Avatar,
  DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, DropdownSection, AvatarIcon
} from "@nextui-org/react";
import Home from '../components/Client/Home';
import Explore from '../components/Client/Explore';
import CreateEvent from '../components/Client/CreateEvent';
import Frame from '../components/Client/Frame';
import Profile from '../components/Client/Profile';
import MyEvent from '../components/Client/MyEvent';

function Client() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [isLogin, setIsLogin] = useState(false);

  const menuItems = [
    "Trang chủ",
    "Khám phá",
  ];

  return (
    <div className='Client'>
      <Navbar
        onMenuOpenChange={setIsMenuOpen}
        maxWidth="xl"
        // shouldHideOnScroll="true"
        isBordered={true}
        isBlurred={false}
        classNames={{
          wrapper: [
            "px-5"
          ],
          item: [
            "flex",
            "relative",
            "h-full",
            "items-center",
            "p-3",
            "data-[active=true]:after:content-['']",
            "data-[active=true]:after:absolute",
            "data-[active=true]:after:bottom-0",
            "data-[active=true]:after:left-0",
            "data-[active=true]:after:right-0",
            "data-[active=true]:after:h-[3px]",
            "data-[active=true]:after:rounded-[2px]",
            "data-[active=true]:after:bg-primary",
          ],
        }}
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="md:hidden"
          // icon={isMenuOpen ? <i className="fa-solid fa-xmark"></i> : <i className="fa-solid fa-bars"></i>}
          />
          <Link to="/">
            <NavbarBrand className="gap-3" size="sm">
              <Avatar className="w-9 h-9 text-tiny sm:flex hidden" src="https://ret.tvu.edu.vn/static/media/logoTVU.8b2bf4cf5ea786d20d60.png" />
              <p className="font-bold text-inherit">TVU FRAME</p>
            </NavbarBrand>
          </Link>
          <Button color="#fff" size='md' isIconOnly className='md:hidden flex -ml-3'>
            <i className="fa-solid fa-magnifying-glass text-base mr-0 opacity-50"></i>
          </Button>
        </NavbarContent>

        <NavbarContent className="hidden md:flex w-full" justify="center">
          <NavbarItem isActive>
            <Link color="foreground" to="/">
              Trang chủ
            </Link>
          </NavbarItem>
          <NavbarItem >
            <Link color="foreground" to="/explore">
              Khám phá
            </Link>
          </NavbarItem>
          <NavbarItem className="w-full max-w-96">
            <Input
              classNames={{
                base: "h-10",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
              }}
              placeholder="Tìm kiếm sự kiện..."
              size="sm"
              startContent={<i className="fa-solid fa-magnifying-glass"></i>}
              type="search"
            />
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end" className='flex gap-4 sm:gap-6'>
          {
            isLogin ?
              <>
                <Button color="primary" size='md' as={Link} to="/create-event" className='sm:flex hidden'>
                  <i className="fa-solid fa-plus"></i>
                  <span>Tạo sự kiện</span>
                </Button>
                <Button color="primary" size='sm' isIconOnly className='sm:hidden flex' as={Link} to="/create-event">
                  <i className="fa-solid fa-plus text-base"></i>
                </Button>
                <Dropdown placement="bottom-end">
                  <DropdownTrigger>
                    <Avatar
                      isBordered
                      as="button"
                      className="transition-transform"
                      color="primary"
                      size="sm"
                      icon={<AvatarIcon />}
                    />
                  </DropdownTrigger>
                  <DropdownMenu>
                    <DropdownItem key="profile" className="h-14 gap-2">
                      <p className="font-semibold">Đăng nhập với</p>
                      <p className="font-semibold">kakanvk@gmail.com</p>
                    </DropdownItem>
                    <DropdownSection showDivider>
                      <DropdownItem
                        key="help_and_feedback"
                        startContent={<i className="fa-regular fa-user"></i>}
                        as={Link}
                        to="/profile"
                      >
                        Tài khoản</DropdownItem>
                      <DropdownItem
                        key="configurations"
                        startContent={<i className="fa-regular fa-star"></i>}
                        as={Link}
                        to="/my-event"
                      >
                        Sự kiện của tôi</DropdownItem>
                    </DropdownSection>
                    <DropdownItem
                      key="logout"
                      color="danger"
                      startContent={<i className="fa-solid fa-arrow-right-from-bracket"></i>}
                      onClick={() => { setIsLogin(!isLogin); }}
                    >
                      Đăng xuất
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </>
              :
              <Button color="primary" variant="light" className='Navbar-btn-login' onPress={onOpen}>
                ĐĂNG NHẬP
              </Button>
          }
        </NavbarContent>
        <NavbarMenu className="flex flex-col gap-5 px-7 py-5">
          <NavbarMenuItem isActive>
            <Link to="/" className='flex gap-4 items-center'>
              <i className="fa-solid fa-house text-base flex w-5"></i>
              Trang chủ
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link className='flex gap-4 items-center' to="/explore">
              <i className="fa-solid fa-compass"></i>
              Khám phá
            </Link>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="md" placement="center" disableAnimation>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Đăng nhập</ModalHeader>
              <ModalBody>
                <p>
                  Bằng cách đăng nhập, bạn đã chấp nhận các điều khoản dịch vụ của chúng tôi.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  startContent={<i className="fa-brands fa-google"></i>}
                  fullWidth="true"
                  radius="sm"
                  onPress={() => {setIsLogin(!isLogin); onClose()}}
                >
                  Đăng nhập với Google
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className='Client-content'>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="explore" element={<Explore />} />
          <Route path="create-event" element={<CreateEvent />} />
          <Route path="frame" element={<Frame />} />
          <Route path="profile" element={<Profile />} />
          <Route path="my-event" element={<MyEvent />} />
        </Routes>
      </div>
    </div>
  )
}

export default Client
