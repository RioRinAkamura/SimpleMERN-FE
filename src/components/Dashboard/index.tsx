import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../../contexts/PostContext";
import { Button, Card, Col, Empty, Modal, Row, Spin, notification } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlayCircleOutlined,
  PlusCircleOutlined,
  SmileOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { AuthContext } from "../../contexts/AuthContext";
import FormEdit from "../FormPost";

export interface Post {
  _id: string;
  title: string;
  description: string;
  status: string;
  url: string;
}

const openNotification = (success: boolean, message: string) => {
  notification.open({
    message: success ? "Success" : "Failed",
    description: message,
    icon: success ? (
      <SmileOutlined style={{ color: "#108ee9" }} />
    ) : (
      <WarningOutlined style={{ color: "#ff1e16" }} />
    ),
  });
};

const Dashboard = () => {
  const {
    postState: { posts, postLoading },
    getPosts,
    deletePost,
  } = useContext(PostContext);

  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [postEdit, setPostEdit] = useState<Post>();

  // Start: Get all posts
  useEffect(() => {
    getPosts();
  }, []);

  const handleLinkClick = (url: string) => {
    const win = window.open(`${url}`, "_blank");
    if (win) {
      win.focus();
    }
  };

  const handleOk = () => {
    console.log("ok");
  };

  const handleEditPost = (id: string) => {
    setIsEdit(true);
    const editPost = posts.filter((post: Post) => post._id === id)[0];
    setPostEdit(editPost);
  };

  const handleDelete = async (id: string) => {
    console.log("id", id);

    await deletePost(id);
    // openNotification()
  };

  let body = null;
  if (postLoading) {
    body = (
      <Wrapper>
        <Spin />
      </Wrapper>
    );
  } else if (posts.length === 0) {
    body = (
      <Wrapper>
        <div style={{ textAlign: "center", paddingBottom: 150 }}>
          <h2>Hi {username}! Click button below to add new post</h2>
          <div>
            <Button type="primary" onClick={() => setIsCreate(true)}>
              Create
            </Button>
          </div>
        </div>
      </Wrapper>
    );
  } else {
    body = (
      <>
        <ButtonWrap>
          <Button type="primary" onClick={() => setIsCreate(true)}>
            Add post
          </Button>
        </ButtonWrap>

        <Row gutter={[16, 16]}>
          {posts &&
            posts.map((post: Post) => (
              <Col md={6} sm={24} xs={24} key={post._id}>
                <Card
                  title={post.title}
                  extra={
                    <Actions>
                      <IconWrap onClick={() => handleLinkClick(post.url)}>
                        <PlayCircleOutlined style={{ color: "#00be20" }} />
                      </IconWrap>
                      <IconWrap onClick={() => handleEditPost(post._id)}>
                        <EditOutlined style={{ color: "#0003be" }} />
                      </IconWrap>
                      <IconWrap onClick={() => handleDelete(post._id)}>
                        <DeleteOutlined style={{ color: "red" }} />
                      </IconWrap>
                    </Actions>
                  }
                >
                  <p>{post.description}</p>
                  <p>{post.url}</p>
                  <p>{post.status}</p>
                </Card>
              </Col>
            ))}
        </Row>
      </>
    );
  }

  return (
    <div>
      {body}
      <FormEdit
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        isCreate={isCreate}
        setIsCreate={setIsCreate}
        postEdit={postEdit}
      />
    </div>
  );
};

export default Dashboard;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
`;

const IconWrap = styled.div`
  padding: 0px 8px;
  font-size: 16px;
  cursor: pointer;

  :hover {
    opacity: 0.7;
  }
`;

const ButtonWrap = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 24px 0px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 24px;
`;
