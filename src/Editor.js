import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_HOST } from "./api_utils";
import Sidebar from "./components/Sidebar";
import TopNav from "./components/TopNav";
import geditorConfig from "./api_utils/geditor_config";
import PageSection from "./components/PageSection";

const Editor = () => {
  const [editor, setEditor] = useState(null);
  const [assets, setAssets] = useState([]);
  const { pageId } = useParams();

  const { pageStore } = useSelector((state) => state);
  const { pages } = pageStore;

  useEffect(() => {
    async function getAllAssets() {
      try {
        // const response = await axios.get(`${API_HOST}assets/`);
        // setAssets(response.data);
      } catch (error) {
        setAssets(error.message);
      }
    }

    getAllAssets();
  }, []);

  useEffect(() => {
    const editor = geditorConfig(assets, pageId);
    setEditor(editor);
  }, [pageId, assets]);
  return (
    <div className="App">
     
      <div
        className="main-content position-relative w-85 start-15"
        id="main-content"
      >
        <TopNav />
        <Sidebar />
        <div id="editor"></div>
      </div>
    </div>
  );
};

export default Editor;
