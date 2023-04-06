import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useForm, Controller } from "react-hook-form";

import { useProjects } from "@/store";

import { Typography, Input, Radio, Select, Button, Modal, Space } from "antd";
import { SearchOutlined, CheckOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import Icon from "@ant-design/icons/lib/components/Icon";

import { PorjectsProps } from "./ProjectsList.types";

import svgAdd from "../../../public/svg/add";

import s from "./ProjectsList.module.scss";
import classNames from "classnames";
import { SizeType } from "antd/es/config-provider/SizeContext";

export function ProjectsList({ ...props }: PorjectsProps) {
    const router = useRouter()

    const { Title, Text } = Typography;
    const { Search } = Input;

    // zustand
    const {
        projects,
        selectProject,
        setAddProject,
        setRemoveProject,
        setCopyProject,
        setEditProject,
        setSelectProject,
        sortProjects,
        setEditSortType,
        setEditSortText,
        setEditSortUp
    } = useProjects(state => state)
    // zustand

    const onSearch = (text: string) => {
        setEditSortText(text)
    };

    const options = [
        { label: "По дате добавления", value: 0 },
        { label: "По дате изменения", value: 1 },
        { label: "По названию", value: 2 },
    ];

    const [sort, setSort] = useState("По дате добавления");

    const onChangeSort = (value: any) => {
        const text = value.target.value;
        setSort(text);
        setEditSortType(text)
    };

    const onChangeSortUp = (value: any) => {
        setEditSortUp(value)
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddModalOpen, setAddIsModalOpen] = useState(false);

    // для контроля размеров
    const [windowWidth, setWindowWidth] = useState('default')

    useEffect(() => {
        if (window) {
            if (window.innerWidth > 660) {
                setWindowWidth('default')
            } else {
                setWindowWidth('small')
            }
        }
    }, [])

    const { control, handleSubmit, setValue } = useForm();

    const open = () => {
        console.log("Открыть этот проект");
    };

    const copy = (project: any) => {
        setCopyProject(project)
    };

    const close = () => {
        setIsModalOpen(false);
        setAddIsModalOpen(false);

        setValue(
            'title', ''
        )

        router.replace('/projects', undefined, { shallow: true });
        router.push({
            pathname: 'projects',
            query: { currentId: window.localStorage.getItem('lastSelectedProject') ?? 0 }
        })
    };

    const edit = (data: any) => {
        setValue(
            "title",
            projects.find((current: any) => {
                return current.id === data.id;
            })?.title ?? ""
        );
        setIsModalOpen(true);
    };

    const onSubmit = (data: any) => {
        const id = Number(router.query.currentId)
        setEditProject(id, data.title)
        setSelectProject(Number(router.query.currentId))
        close()
    };

    const addProject = (data: any) => {
        if (data.title) {
            setAddProject(data)
            close()
        }
    }

    const confirm = (id: number) => {
        router.push({
            pathname: '/projects',
            query: { remove: id }
        })

        Modal.confirm({
            title: 'Вы уверены, что хотите удалить этот проект?',
            icon: <ExclamationCircleOutlined />,
            onCancel: () => close(),
            onOk: () => {
                setRemoveProject(id)
                window.localStorage.setItem('lastSelectedProject', String(projects.filter(current => current.id != id)[0].id))
                close()
            },
            maskClosable: true,
            okText: 'Да',
            cancelText: 'Отмена',
        });
    }

    useEffect(() => {
        if (window) {
            router.push({
                pathname: '/projects',
                query: { currentId: window.localStorage.getItem('lastSelectedProject') ?? 0 }
            })
        }
    }, [projects])

    useEffect(() => {
        setSelectProject(Number(router.query.currentId))
    }, [router, selectProject])

    const handleClickProject = (current: any) => {
        window.localStorage.setItem('lastSelectedProject', (current.id))
        router.push(
            {
                pathname: '/projects',
                query: { currentId: current.id }
            }
        )
    }

    return (
        <div className={s.wrapper}>
            <Modal
                title="Переименовать"
                open={isModalOpen}
                footer={null}
                className={s.modal}
                mask={true}
                onCancel={close}
            >
                <form className={s.input} onSubmit={handleSubmit(onSubmit)}>
                    <Space.Compact style={{ width: "100%" }}>
                        <Controller
                            name="title"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    placeholder="Введите название"
                                />
                            )}
                        />
                        <Button
                            htmlType="submit"
                            type="primary"
                            icon={<CheckOutlined />}
                        ></Button>
                    </Space.Compact>
                </form>
            </Modal>

            <Modal
                title="Название"
                open={isAddModalOpen}
                footer={null}
                className={s.modal}
                mask={true}
                onCancel={close}
            >
                <form className={s.input} onSubmit={handleSubmit(addProject)}>
                    <Space.Compact style={{ width: "100%" }}>
                        <Controller
                            name="title"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    placeholder="Новый проект"
                                />
                            )}
                        />
                        <Button
                            htmlType="submit"
                            type="primary"
                            icon={<CheckOutlined />}
                        ></Button>
                    </Space.Compact>
                </form>
            </Modal>


            <div className={s.header}>
                <div className={s.header__search}>
                    <Title level={5} className={s.header__title}>
                        Список проектов
                    </Title>
                    <div className={s.header__input}>
                        <Search
                            key="search"
                            id="search"
                            placeholder="Поиск..."
                            onSearch={onSearch}
                            enterButton={[
                                <SearchOutlined key={"searchIcon"} />,
                                "Найти",
                            ]}
                        />
                    </div>
                </div>
                <div className={s.header__sort}>
                    <Select
                        defaultValue="По возрастанию"
                        className={s.header__select}
                        bordered={false}
                        onChange={onChangeSortUp}
                        options={[
                            {
                                value: 0,
                                label: "По возрастанию",
                            },
                            {
                                value: 1,
                                label: "По убыванию"
                            },
                        ]}
                    />
                    <Radio.Group
                        options={options}
                        onChange={onChangeSort}
                        defaultValue={0}
                        size={windowWidth as SizeType}
                        buttonStyle={windowWidth === 'small' ? 'solid' : 'outline'}
                        className={s.header__group}
                        optionType="button"
                    />
                </div>
            </div>

            <div className={s.list}>
                {projects.map((current: any) => {
                    return (
                        <div onClick={() => handleClickProject(current)} key={current.id} className={classNames(s.list__item, {
                            [s.list__item_active]: Number(router.query.currentId) == current.id
                        })}>
                            <svg
                                className={s.list__svg}
                                width="34"
                                height="28"
                                viewBox="0 0 34 28"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    className={s.list__svg}
                                    stroke="#1890FF"
                                    d="M4.03709 0.666748H11.4445L17.0001 6.00008H29.963C30.9453 6.00008 31.8874 6.37468 32.5819 7.04148C33.2765 7.70828 33.6667 8.61265 33.6667 9.55564V23.7779C33.6667 24.7209 33.2765 25.6252 32.5819 26.292C31.8874 26.9588 30.9453 27.3334 29.963 27.3334H4.03709C3.05481 27.3334 2.11276 26.9588 1.41818 26.292C0.723598 25.6252 0.333387 24.7209 0.333387 23.7779V4.2223C0.333387 3.27931 0.723598 2.37494 1.41818 1.70815C2.11276 1.04135 3.05481 0.666748 4.03709 0.666748Z"
                                    fill="#1890FF"
                                />
                            </svg>
                            <div className={s.list__info}>
                                <Title level={5}>{current.title}</Title>
                                <Text className={s.list__text} type="secondary">{current.date}</Text>
                            </div>
                            <Button className={s.list__open} onClick={open}>Открыть</Button>
                            <div className={s.menu}>
                                <svg
                                    onClick={() => edit(current)}
                                    className={s.menu__svg}
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g
                                        className={s.menu__svg}
                                        clipPath="url(#clip0_179_10303)"
                                    >
                                        <path
                                            d="M3.99927 20.0001H7.99927L18.4993 9.50006C19.0297 8.96963 19.3277 8.2502 19.3277 7.50006C19.3277 6.74991 19.0297 6.03049 18.4993 5.50006C17.9688 4.96963 17.2494 4.67163 16.4993 4.67163C15.7491 4.67163 15.0297 4.96963 14.4993 5.50006L3.99927 16.0001V20.0001Z"
                                            stroke="#1890FF"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M13.4999 6.49988L17.4999 10.4999"
                                            stroke="#1890FF"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </g>
                                </svg>

                                <svg
                                    onClick={() => copy(current)}
                                    className={s.menu__svg}
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g
                                        className={s.menu__svg}
                                        clipPath="url(#clip0_179_10307)"
                                    >
                                        <path
                                            d="M18.9999 2.99988H8.99988C7.89531 2.99988 6.99988 3.89531 6.99988 4.99988V14.9999C6.99988 16.1044 7.89531 16.9999 8.99988 16.9999H18.9999C20.1044 16.9999 20.9999 16.1044 20.9999 14.9999V4.99988C20.9999 3.89531 20.1044 2.99988 18.9999 2.99988Z"
                                            stroke="#1890FF"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M16.9998 17V19C16.9998 19.5304 16.789 20.0391 16.414 20.4142C16.0389 20.7893 15.5302 21 14.9998 21H4.99976C4.46932 21 3.96062 20.7893 3.58554 20.4142C3.21047 20.0391 2.99976 19.5304 2.99976 19V9C2.99976 8.46957 3.21047 7.96086 3.58554 7.58579C3.96062 7.21071 4.46932 7 4.99976 7H6.99976"
                                            stroke="#1890FF"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </g>
                                </svg>

                                <svg
                                    onClick={() => confirm(current.id)}
                                    className={s.menu__svg}
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g
                                        className={s.menu__svg}
                                        clipPath="url(#clip0_179_10311)"
                                    >
                                        <path
                                            d="M3.99976 7H19.9998"
                                            stroke="#1890FF"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M9.99976 10.9999V16.9999"
                                            stroke="#1890FF"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M13.9998 10.9998V16.9998"
                                            stroke="#1890FF"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M4.99976 7L5.99976 19C5.99976 19.5304 6.21047 20.0391 6.58554 20.4142C6.96062 20.7893 7.46932 21 7.99976 21H15.9998C16.5302 21 17.0389 20.7893 17.414 20.4142C17.789 20.0391 17.9998 19.5304 17.9998 19L18.9998 7"
                                            stroke="#1890FF"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M8.99988 6.99988V3.99988C8.99988 3.73466 9.10523 3.48031 9.29277 3.29277C9.48031 3.10523 9.73466 2.99988 9.99988 2.99988H13.9999C14.2651 2.99988 14.5194 3.10523 14.707 3.29277C14.8945 3.48031 14.9999 3.73466 14.9999 3.99988V6.99988"
                                            stroke="#1890FF"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </g>
                                </svg>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className={s.add}>
                <Button type="primary" className={s.add__button} onClick={() => { setAddIsModalOpen(true) }}>
                    <Icon component={svgAdd} />
                    Добавить новый проект</Button>
            </div>
        </div>
    );
}
