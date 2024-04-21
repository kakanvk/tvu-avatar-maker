
import './Client.css'

import React, { useState, useRef, useEffect } from 'react';
import { Link } from "react-router-dom"
import { Tooltip, QRCode } from 'antd';
import { Button, Spinner, Avatar as AvatarNUI, User } from "@nextui-org/react";
import Avatar from './Avatar';

import { Stage, Layer, Image } from 'react-konva';
import toast, { Toaster } from 'react-hot-toast';

function Event() {

    const initSizeForStage = 450;

    const [sizeOfStage, setSizeOfStage] = useState(Math.min(initSizeForStage, window.innerWidth - 80));
    const stageRef = useRef(null);
    const [image, setImage] = useState(null);
    const [frameImage, setFrameImage] = useState(null);
    const [scale, setScale] = useState(1);
    const [rotate, setRotate] = useState(0);
    const [process, setProcess] = useState(1);
    const [isDragging, setIsDragging] = useState(false);
    const [offsetX, setOffsetX] = useState(0);
    const [offsetY, setOffsetY] = useState(0);

    const [onUploadProcess, setOnUploadProcess] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setSizeOfStage(Math.min(initSizeForStage, window.innerWidth - 80));
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const frameImg = new window.Image();
        frameImg.crossOrigin = 'Anonymous'; // Đặt crossOrigin thành 'Anonymous'
        frameImg.src = "https://firebasestorage.googleapis.com/v0/b/tvu-frame.appspot.com/o/Frame.png?alt=media&token=029eaf43-922a-400d-9548-c64faa9421f2";
        frameImg.onload = () => {
            setFrameImage(frameImg);
        };
    }, []);

    const handleButtonClick = () => {
        document.getElementById('fileInput').click();
    };

    const handleImageUpload = (e) => {
        setOnUploadProcess(true);
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onprogress = (event) => {
            if (event.lengthComputable) {
                const percentLoaded = (event.loaded / event.total) * 100;
                setProcessValue(percentLoaded);
            }
        };

        reader.onload = () => {
            const img = new window.Image();
            img.src = reader.result;
            img.onload = () => {
                setImage(img);
                setScale(sizeOfStage / Math.min(img.width, img.height));
                // Tính offsetX và offsetY để đặt ảnh ngay giữa khung hình
                const scaledWidth = img.width * scale;
                const scaledHeight = img.height * scale;
                const newOffsetX = (img.width) / 2;
                const newOffsetY = (img.height) / 2;
                setOffsetX(newOffsetX);
                setOffsetY(newOffsetY);
            };
            setOnUploadProcess(false);
        };

        reader.readAsDataURL(file);
    };

    const downloadURI = (uri, name) => {
        var link = document.createElement('a');
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const handleDownloadImage = () => {
        const uri = stageRef.current.toDataURL({
            mimeType: 'image/png', // hoặc 'image/png'
            quality: 1, // chất lượng ảnh, giá trị từ 0 đến 1
            pixelRatio: 2000 / sizeOfStage, // tỷ lệ pixel, có thể tăng để có chất lượng cao hơn
        });

        downloadURI(uri, 'Frame-Avatar.png');
    };

    const handleScaleChange = (e) => {
        setScale(parseFloat(e.target.value));
    };

    const handleRotateChange = (e) => {
        setRotate(parseInt(e.target.value));
    };

    const handleDragStart = () => {
        setIsDragging(true); // Khi bắt đầu kéo thả, đặt biến trạng thái là true
    };

    const handleDragEnd = () => {
        setIsDragging(false); // Khi kết thúc kéo thả, đặt biến trạng thái là false
    };

    const handleCopyText = () => {
        const textToCopy = `doanthanhnien.tvu.edu.vn/frame/event/123`;
        const textField = document.createElement('textarea');
        textField.innerText = textToCopy;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand('copy');
        textField.remove();
        toast.success('Đã copy vào bộ nhớ tạm', {
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            },
        })
    };

    const downloadQRCode = () => {
        const canvas = document.getElementById('myqrcode')?.querySelector < HTMLCanvasElement > ('canvas');
        if (canvas) {
            const url = canvas.toDataURL();
            const a = document.createElement('a');
            a.download = 'QRCode.png';
            a.href = url;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };

    return (
        <div className='Event flex flex-col w-full items-center relative h-full py-5'>
            <Toaster position="bottom-center" />
            <div className='flex flex-col w-full items-center gap-5'>
                <div className='Event-logo flex gap-3 items-end'>
                    <Avatar src="https://firebasestorage.googleapis.com/v0/b/tvu-frame.appspot.com/o/logoDTN.png?alt=media&token=09ee6af8-8302-4483-86a4-98f38aff155b" size={47} />
                    <Avatar src="https://firebasestorage.googleapis.com/v0/b/tvu-frame.appspot.com/o/logoTVU.png?alt=media&token=6c74a3ab-5b6e-425d-a4e5-faf1059c1181" />
                    <Avatar src="https://firebasestorage.googleapis.com/v0/b/tvu-frame.appspot.com/o/logoHSV.png?alt=media&token=cc5c0a16-254c-4fa7-bd22-50a81e007ab8" />
                    {/* <Avatar src="https://firebasestorage.googleapis.com/v0/b/tvu-frame.appspot.com/o/logobieutuong.png?alt=media&token=2f9006c5-58db-49ec-9745-650827657851" size={125} /> */}
                </div>

                <div className='Event-title flex flex-col gap-3 items-center'>
                    <h1 className='font-extrabold text-[23px] text-center md:text-[25px]'>Đại hội Đại biểu Hội Sinh viên Trường Đại học Trà Vinh</h1>
                    <div className='flex mx-[auto] gap-3 md:justify-center flex-wrap text-sky-600 text-sm'>
                        <span className='italic font-semibold bg-slate-100 px-2 rounded-md'>#HSVĐHTV</span>
                        <span className='italic font-semibold bg-slate-100 px-2 rounded-md'>#1809</span>
                        <span className='italic font-semibold bg-slate-100 px-2 rounded-md'>#ĐHVIII</span>
                    </div>
                </div>

                <div className='flex gap-8 flex-wrap text-sm'>
                    <Tooltip title="Lượt xem">
                        <div className='flex gap-2 items-center opacity-50 hover:cursor-pointer'>
                            <i className="fa-regular fa-eye"></i>
                            <span>123.323</span>
                        </div>
                    </Tooltip>
                    <Tooltip title="Lượt tải">
                        <div className='flex gap-2 items-center opacity-50 hover:cursor-pointer'>
                            <i className="fa-regular fa-images"></i>
                            <span>123</span>
                        </div>
                    </Tooltip>
                    <Tooltip title="Ngày bắt đầu">
                        <div className='flex gap-2 items-center opacity-50 hover:cursor-pointer'>
                            <i className="fa-regular fa-clock"></i>
                            <span>2 ngày trước</span>
                        </div>
                    </Tooltip>
                </div>
            </div>

            <div className='Event flex flex-col w-full items-center gap-10 relative h-full py-8 p-7'>
                {/* Your other JSX content */}
                <div className='flex flex-col md:flex-row gap-10'>
                    <div className='Frame-view'>
                        <div className='relative inset-0 flex justify-center items-center'>
                            {
                                onUploadProcess &&
                                <>
                                    <div className='absolute z-50 bg-[black] w-full h-full opacity-50'></div>
                                    <Spinner className='absolute z-50' />
                                </>
                            }

                            <Stage width={sizeOfStage} height={sizeOfStage} ref={stageRef} className='cursor-move p-4 border-dashed border-2 rounded-lg '>
                                <Layer>
                                    {image && (
                                        <Image
                                            image={image}
                                            draggable
                                            scaleX={scale}
                                            scaleY={scale}
                                            rotation={rotate}
                                            offsetX={offsetX}
                                            offsetY={offsetY}
                                            onDragStart={handleDragStart}
                                            onDragEnd={handleDragEnd}
                                        />
                                    )}
                                </Layer>
                                <Layer>
                                    {frameImage && (
                                        <Image
                                            image={frameImage}
                                            width={sizeOfStage}
                                            height={sizeOfStage}
                                            listening={false}
                                            opacity={isDragging ? 0.8 : 1}
                                        />
                                    )}
                                </Layer>
                            </Stage>
                        </div>
                        <input type="file" id="fileInput" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
                        <Button color={image ? "default" : "primary"} className='w-full mt-3' radius='sm' onClick={handleButtonClick}>
                            <i className="fa-solid fa-camera mr-1"></i>{image ? "Thay đổi ảnh" : "Tải ảnh lên"}
                        </Button>
                    </div>
                    {
                        image ?
                            <div className='w-full md:w-[350px] flex flex-col gap-2'>
                                <div className='w-full'>
                                    <label htmlFor="rotate">Xoay:</label>
                                    <input
                                        className='w-full'
                                        type="range"
                                        id="rotate"
                                        min="0"
                                        max="360"
                                        step="0.5"
                                        value={rotate} // Kết nối với giá trị rotate từ state
                                        onChange={handleRotateChange} // Xử lý sự kiện thay đổi rotate
                                    />
                                </div>
                                <div className='w-full'>
                                    <label htmlFor="scale">Phóng to:</label>
                                    <input
                                        className='w-full'
                                        type="range"
                                        id="scale"
                                        min="0.05"
                                        max="2"
                                        step="0.01"
                                        value={scale}
                                        onChange={handleScaleChange}
                                    />
                                </div>
                                <Button color="primary" className='w-full mt-3' radius='sm' onClick={handleDownloadImage} isDisabled={!image}>
                                    Tải về
                                </Button>
                            </div> : ""
                    }
                </div>
            </div>

            <div className='flex flex-col mt-10 gap-12 justify-center items-center md:items-start md:border-1 rounded-xl p-4 md:flex-row lg:p-10 w-full md:w-fit'>
                <div className='flex flex-col gap-2'>
                    <QRCode value="http://localhost:5173/event/123" id="myqrcode" />
                    <Button color="primary" onClick={() => downloadQRCode()} className="w-full" radius='full' size='sm'>
                        Tải xuống
                    </Button>
                </div>
                <div className='flex flex-col gap-8 items-start w-full max-w-[500px]'>
                    <div className='flex flex-col gap-2 w-full'>
                        <span><i className="fa-solid fa-link mr-2 text-sm"></i>Liên kết của sự kiện:</span>
                        <div className='flex items-center justify-between gap-2 bg-zinc-200 w-full rounded-full px-1 pl-4 py-1'>
                            <p className='text-base truncate'>
                                <i className="text-[12px] fa-solid fa-lock mr-2 -translate-y-[1px] opacity-50"></i>
                                doanthanhnien.tvu.edu.vn/frame/event/123
                            </p>
                            <Button
                                isIconOnly
                                radius='full'
                                variant='light'
                                size='sm'
                                onPress={() => handleCopyText()}
                            >
                                <i className="fa-regular fa-clone text-sm"></i>
                            </Button>
                        </div>
                    </div>
                    <div className='flex items-center gap-3'>
                        <span><i className="fa-solid fa-share-nodes mr-2"></i>Chia sẻ ngay:</span>
                        <div className='flex items-center gap-1'>
                            <Button isIconOnly variant='light' radius='full' as={Link} target='blank' to="https://www.facebook.com/share_channel/?link=https://www.youtube.com/watch?v=DtBwTYS0hJs&app_id=966242223397117&source_surface=external_reshare&display&hashtag">
                                <AvatarNUI src='https://cdn-icons-png.flaticon.com/512/5968/5968764.png' size="sm"/>
                            </Button>
                            <Button isIconOnly variant='flat' radius='full' className='scale-85'>
                                <i className="fa-solid fa-ellipsis text-lg"></i>
                            </Button>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        <span className='text-sm opacity-50'>Tạo bởi</span>
                        <div className='flex items-center justify-between w-full'>
                            <User
                                name="Ka Ka"
                                description="caoka5265@gmail.com"
                                avatarProps={{
                                    src: "https://lh3.googleusercontent.com/a/ACg8ocKt1yh-NnczI6UNOITradVOkPZnzNTzr60llGTcmBZh4w=s96-c"
                                }}
                            />
                            <Button isIconOnly variant='light'><i className="fa-solid fa-ellipsis-vertical text-base"></i></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    )
}

export default Event
