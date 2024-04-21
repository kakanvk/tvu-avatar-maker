import './Client.css'
import { Button, Image, Tabs, Tab, Input, Chip, ScrollShadow } from "@nextui-org/react";
import PhoneFrame from "../../assets/PhoneFrame.png"
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Avatar from './Avatar';
import toast, { Toaster } from 'react-hot-toast';


function CreateEvent() {

    const [uploadedImage, setUploadedImage] = useState(null);
    const [eventName, setEventName] = useState("");
    const [eventDesc, setEventDecs] = useState("");
    const [eventTag, setEventTag] = useState("");
    const [eventTags, setEventTags] = useState([]);
    const [eventSlug, setEventSlug] = useState("");
    const [selected, setSelected] = useState("1");
    const [process, setProcess] = useState(1);

    const handleClose = (tagToRemove) => {
        setEventTags(eventTags.filter(tag => tag !== tagToRemove));
    };

    const handleButtonClick = () => {
        document.getElementById('fileInput').click();
    };

    useEffect(() => {
        if (eventName !== "") {
            setProcess(3);
        } else {
            if (uploadedImage) {
                setProcess(2);
            }
        }
    }, [eventName])

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            setUploadedImage(reader.result);
            setProcess(2);
        };

        reader.readAsDataURL(file);
    };

    const handleCreateEvent = () => {
        console.log('create event');
    }

    const handleAddTag = () => {
        const newTags = [...eventTags,
        {
            id: uuidv4(),
            content: eventTag
        }
        ];
        setEventTags(newTags);
        setEventTag("");
    }

    const handleCopyText = () => {
        const textToCopy = `doanthanhnien.tvu.edu.vn/frame/event/${eventSlug}`;
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

    const onSlugChange = (_slug) => {
        const sanitizedSlug = _slug.replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
        setEventSlug(sanitizedSlug);
    }

    return (
        <div className='CreateEvent flex flex-col gap-16 items-center justify-center lg:flex-row lg:gap-40 lg:items-start'>
            <Toaster position="bottom-center" />
            <div className='flex-1 max-w-[450px] h-full w-full'>
                <div className="flex w-full flex-col items-center">
                    <Tabs
                        aria-label="Options"
                        selectedKey={selected}
                        onSelectionChange={setSelected}
                        color='primary'
                        size='sm'
                        classNames={{
                            base: "mt-4",
                            panel: "w-full"
                        }}
                        radius='full'
                        disabledKeys={[`${process < 2 ? "2" : null}`, `${process < 3 ? "3" : null}`]}
                    >
                        <Tab key="1" title="Chọn khung">
                            <div className='w-full relative flex items-center justify-center mt-4'>
                                <input type="file" id="fileInput" accept="image/png" style={{ display: 'none' }} onChange={handleImageUpload} />
                                {
                                    uploadedImage &&
                                    <Button
                                        color="default"
                                        className='absolute bottom-0 right-0 z-20 mb-5 mr-5'
                                        radius='sm'
                                        onClick={handleButtonClick}
                                        isIconOnly
                                    >
                                        <i className="fa-solid fa-camera text-[20px]"></i>
                                    </Button>
                                }
                                {uploadedImage ?
                                    <Image
                                        classNames={{
                                            img: "w-full",
                                            wrapper: "w-full"
                                        }}
                                        src={uploadedImage}
                                    /> :
                                    <div className='w-full aspect-square border-dashed border-2 rounded-lg'>

                                    </div>
                                }
                            </div>
                            {
                                !uploadedImage &&
                                <Button
                                    color="primary"
                                    className='mt-5 w-full'
                                    radius='sm'
                                    onClick={handleButtonClick}
                                >Tải ảnh lên</Button>
                            }
                        </Tab>
                        <Tab key="2" title="Nhập thông tin">
                            <div className='w-full flex flex-col gap-7 mt-4'>
                                <Input
                                    type="email"
                                    variant="bordered"
                                    label="Tên sự kiện"
                                    labelPlacement='outside'
                                    placeholder="Tên sự kiện"
                                    size='lg'
                                    value={eventName}
                                    onValueChange={setEventName}
                                    isRequired
                                    className='w-full'
                                    isClearable
                                />
                                <Input
                                    type="email"
                                    variant="bordered"
                                    label="Mô tả"
                                    labelPlacement='outside'
                                    placeholder="Mô tả"
                                    size='lg'
                                    value={eventDesc}
                                    onValueChange={setEventDecs}
                                    className='w-full'
                                    isClearable
                                />
                                <div className='flex flex-col gap-4'>
                                    <div className='flex items-end gap-3'>
                                        <Input
                                            type="tag"
                                            variant="bordered"
                                            label="HashTag"
                                            labelPlacement='outside'
                                            placeholder={eventTags.length >= 3 ? "Đã đạt số lượng tối đa" : 'Thêm tag mới'}
                                            startContent={<i className="fa-solid fa-hashtag opacity-40"></i>}
                                            size='lg'
                                            value={eventTag}
                                            onValueChange={setEventTag}
                                            className='w-full'
                                            isClearable
                                        />
                                        <Button
                                            size='lg'
                                            className='bg-green-500 text-white'
                                            isIconOnly
                                            isDisabled={eventTag === "" || eventTags.length >= 3}
                                            onClick={() => handleAddTag()}
                                        >
                                            <i className="fa-solid fa-plus"></i>
                                        </Button>
                                    </div>
                                    <div className="flex gap-3 flex-wrap">
                                        {eventTags.map((tag, index) => (
                                            <Chip
                                                key={tag.id}
                                                onClose={() => handleClose(tag)}
                                                endContent={<i className="fa-solid fa-circle-xmark ml-1 hover:text-red-600"></i>}
                                                variant="flat"
                                                radius='md'
                                                classNames={{
                                                    base: "bg-slate-100",
                                                    content: "text-sky-600 font-medium italic"
                                                }}
                                            >
                                                #{tag.content}
                                            </Chip>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Tab>
                        <Tab key="3" title="Hoàn tất">
                            <div className='w-full flex flex-col gap-6 mt-4'>
                                <Input
                                    type="email"
                                    variant="bordered"
                                    label="Đường dẫn (URL)"
                                    labelPlacement='outside'
                                    placeholder="Nhập đường dẫn"
                                    size='lg'
                                    value={eventSlug}
                                    onValueChange={onSlugChange}
                                    isRequired
                                    className='w-full'
                                    isClearable
                                />
                                {
                                    eventSlug !== "" &&
                                    <div className='flex flex-col gap-2'>
                                        <span className='text-sm'><i className="fa-solid fa-circle-info mr-[5px] text-sky-600 translate-y-[1px]"></i>Sự kiện sẽ được truy cập qua đường dẫn:</span>
                                        <div className='flex items-center justify-between gap-2 bg-zinc-100 w-full rounded-full px-1 pl-4 py-1'>
                                            <p className='text-sm truncate'>
                                                <i className="text-[12px] fa-solid fa-lock mr-2 -translate-y-[1px] opacity-50"></i>
                                                doanthanhnien.tvu.edu.vn/frame/event/
                                                {eventSlug}
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
                                }
                            </div>
                        </Tab>
                    </Tabs>
                    <div className='flex w-full justify-between mt-5'>
                        <div>
                            {
                                parseInt(selected) - 1 > 0 &&
                                <Button
                                    color="primary"
                                    variant='light'
                                    radius='full'
                                    startContent={<i className="fa-solid fa-arrow-left-long"></i>}
                                    onClick={() => { setSelected((parseInt(selected) - 1).toString()) }}
                                >
                                    Quay lại
                                </Button>
                            }
                        </div>
                        {
                            process > 1 && selected !== "3" &&
                            <Button
                                color="primary"
                                radius='full'
                                className='-translate-x-1'
                                endContent={<i className="fa-solid fa-arrow-right-long"></i>}
                                onClick={() => { setSelected((parseInt(selected) + 1).toString()) }}
                                isDisabled={process === 2 && selected === "2" ? true : false}
                            >
                                Tiếp tục
                            </Button>
                        }
                        {
                            parseInt(selected) === 3 &&
                            <Button
                                color="primary"
                                radius='full'
                                onClick={handleCreateEvent}
                                className='bg-green-500 -translate-x-1 font-semibold'
                                startContent={<i class="fa-solid fa-plus"></i>}
                            >
                                Tạo sự kiện
                            </Button>
                        }
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-center relative'>
                <Image
                    width={300}
                    src={PhoneFrame}
                    radius='sm'
                />
                <ScrollShadow size={20} hideScrollBar className="h-[560px] absolute z-20 py-6 top-3">
                    <div className='flex items-center justify-center flex-col w-[240px] min-h-[510px] gap-3'>
                        <div className='Event-logo flex gap-3 items-end'>
                            <Avatar src="https://firebasestorage.googleapis.com/v0/b/tvu-frame.appspot.com/o/logobieutuong.png?alt=media&token=2f9006c5-58db-49ec-9745-650827657851" size={70} />
                        </div>
                        <div className='flex flex-col gap-1 items-center text-center'>
                            {
                                eventName !== "" &&
                                <p className='font-extrabold'>{eventName}</p>
                            }
                            {
                                eventDesc !== "" &&
                                <p className='text-[12px]'>{eventDesc}</p>
                            }
                        </div>
                        {
                            uploadedImage &&
                            <>
                                {
                                    eventTags.length > 0 &&
                                    <div className='flex mx-[auto] gap-2 justify-center  flex-wrap text-sky-600 text-[10px]'>
                                        {
                                            eventTags.map(tag => {
                                                return (
                                                    <span key={tag.id} className='italic font-semibold bg-slate-100 px-2 rounded-md'>#{tag.content}</span>
                                                )
                                            })
                                        }
                                    </div>
                                }
                                <div className='flex gap-4 flex-wrap text-[11px]'>
                                    <div className='flex gap-1 items-center opacity-50 hover:cursor-pointer'>
                                        <i className="fa-regular fa-eye"></i>
                                        <span>1000</span>
                                    </div>
                                    <div className='flex gap-1 items-center opacity-50 hover:cursor-pointer'>
                                        <i className="fa-regular fa-images"></i>
                                        <span>999</span>
                                    </div>
                                    <div className='flex gap-1 items-center opacity-50 hover:cursor-pointer'>
                                        <i className="fa-regular fa-clock"></i>
                                        <span>1 ngày trước</span>
                                    </div>
                                </div>

                                <Image
                                    className='w-full'
                                    src={uploadedImage}
                                    radius='sm'
                                />
                                <Button color="primary" className='w-full' radius='sm' size='sm'>
                                    Tải ảnh lên
                                </Button>
                            </>
                        }
                    </div>
                </ScrollShadow>

                {
                    uploadedImage &&
                    <span className='absolute bottom-5 text-[12px] w-[80%] bg-zinc-200 py-1 px-3 rounded-2xl text-center truncate z-30'>
                        <i className="fa-solid fa-lock mr-2 text-[10.5px]"></i>.../event/{eventSlug}
                    </span>
                }
            </div>
        </div>
    )
}

export default CreateEvent
