
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";

import {
    Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem,
    Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Avatar,
    DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, DropdownSection, AvatarIcon, Spinner, User, Switch
} from "@nextui-org/react";
import { auth, signInWithGoogle, signOut } from '../../firebase';

function Header() {

    const location = useLocation();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [isLoginLoading, setIsLoginLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        setIsLoginLoading(true);
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
                setIsLoginLoading(false);
                console.log(user);
            } else {
                console.log("user is logged out");
                setIsLoginLoading(false);
            }
        });
    }, []);

    const handleLoginWithGoogle = async (onClose) => {
        try {
            await signInWithGoogle();
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    }

    const handleLogout = async () => {
        try {
            await signOut(auth);
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <Navbar
                onMenuOpenChange={setIsMenuOpen}
                maxWidth="xl"
                shouldHideOnScroll="true"
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
                        className="lg:hidden"
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
                    <NavbarItem isActive={location.pathname === "/"} className='hidden lg:flex'>
                        <Link color="foreground" to="/">
                            Trang chủ
                        </Link>
                    </NavbarItem>
                    <NavbarItem isActive={location.pathname.startsWith('/explore')} className='hidden lg:flex'>
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
                                inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20 pb-1",
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
                        isLoginLoading ? <Spinner size="sm" /> :
                            user ?
                                <>
                                    <Button color="primary" size='md' as={Link} to="/create-event" className='sm:flex hidden'>
                                        <i className="fa-solid fa-plus"></i>
                                        <span>Tạo sự kiện</span>
                                    </Button>
                                    <Button color="primary" size='sm' isIconOnly className='sm:hidden flex' as={Link} to="/create-event">
                                        <i className="fa-solid fa-plus text-base"></i>
                                    </Button>
                                    <Dropdown placement="bottom-end" >
                                        <DropdownTrigger>
                                            <Avatar
                                                isBordered
                                                as="button"
                                                className="transition-transform"
                                                color="primary"
                                                size="sm"
                                                icon={<AvatarIcon />}
                                                src={user?.photoURL}
                                            />
                                        </DropdownTrigger>
                                        <DropdownMenu
                                            itemClasses={{
                                                base: [
                                                    "p-[8px]",
                                                    "px-[12px]",
                                                    "rounded-md",
                                                    "transition-opacity",
                                                    "data-[hover=true]:text-foreground",
                                                    "data-[hover=true]:bg-default-200"
                                                ],
                                            }}
                                        >
                                            <DropdownItem key="profile1" className='pb-0 mb-2' isReadOnly>
                                                <User
                                                    name={user?.displayName}
                                                    description={user?.email}
                                                    avatarProps={{
                                                        src: user?.photoURL
                                                    }}
                                                    classNames={{
                                                        name: ["font-bold"]
                                                    }}
                                                />
                                            </DropdownItem>
                                            <DropdownSection showDivider>
                                                <DropdownItem
                                                    key="profile"
                                                    startContent={<i className="fa-regular fa-user flex w-4 justify-center"></i>}
                                                    as={Link}
                                                    to="/profile"
                                                    endContent={location.pathname.startsWith('/profile') ? <i className="fa-solid fa-circle text-[7px] mt-[1px] text-sky-600"></i> : null}
                                                >
                                                    Tài khoản
                                                </DropdownItem>
                                                <DropdownItem
                                                    key="configurations"
                                                    startContent={<i className="fa-regular fa-star flex w-4 justify-center"></i>}
                                                    as={Link}
                                                    to="/my-event"
                                                    endContent={location.pathname.startsWith('/my-event') ? <i className="fa-solid fa-circle text-[7px] mt-[1px] text-sky-600"></i> : null}
                                                >
                                                    Sự kiện của tôi
                                                </DropdownItem>
                                                <DropdownItem
                                                    isReadOnly
                                                    key="dark-mode"
                                                    startContent={<i className="fa-regular fa-moon flex w-4 justify-center"></i>}
                                                    endContent={<Switch defaultSelected size="sm" className='translate-x-3 scale-75 mr-0'/>}
                                                >
                                                    Giao diện tối
                                                </DropdownItem>
                                            </DropdownSection>
                                            <DropdownItem
                                                key="logout"
                                                color="danger"
                                                startContent={<i className="fa-solid fa-arrow-right-from-bracket flex w-4 justify-center"></i>}
                                                onClick={() => { handleLogout() }}
                                            >
                                                Đăng xuất
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </>
                                :
                                <Button color="primary" variant="light" className='font-bold text-[16px]' onPress={onOpen}>
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
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                size="md" placement="center"
                // disableAnimation
                motionProps={{
                    variants: {
                        enter: {
                            y: 0,
                            opacity: 1,
                            transition: {
                                duration: 0.3,
                                ease: "easeOut",
                            },
                        },
                        exit: {
                            y: -20,
                            opacity: 0,
                            transition: {
                                duration: 0.2,
                                ease: "easeIn",
                            },
                        },
                    }
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Đăng nhập</ModalHeader>
                            <ModalBody>
                                <span>
                                    Bằng cách đăng nhập, bạn đã chấp nhận các điều khoản dịch vụ của <strong>TVU-FRAME</strong>.
                                </span>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="primary"
                                    startContent={<i className="fa-brands fa-google"></i>}
                                    fullWidth="true"
                                    radius="sm"
                                    onPress={() => { handleLoginWithGoogle(onClose) }}
                                >
                                    Đăng nhập với Google
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </ >
    )
}

export default Header
