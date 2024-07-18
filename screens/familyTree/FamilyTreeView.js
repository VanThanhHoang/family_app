import React, { useState, useEffect, useContext } from "react";
import { View, Button } from "react-native";
import { AppContext } from "../../AppContext";
import FamilyTree from "./FamilyTree";
import AxiosInstance from "../../network/AxiosInstance";
import AppHeader from "../../components/AppHeader";
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { APP_CONSTANTS } from "../../helper/constant";

const FamilyMap = () => {
  const [data, setData] = useState(null);
  const { setIsLoading } = useContext(AppContext);
  const getData = async () => {
    setIsLoading(true);
    try {
      const res = await AxiosInstance().get("/relationships/");
      setData(res);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const generatePDF = async () => {
    if (data) {
      const html = createFamilyTreeHTML(data);
      try {
        const { uri } = await Print.printToFileAsync({ 
          html,
          base64: false,
          width: 4000, // Điều chỉnh chiều rộng theo nhu cầu
          height: 792, // Chiều cao A4 landscape
        });
        await Sharing.shareAsync(uri);
      } catch (error) {
        console.error("Failed to generate PDF:", error);
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <AppHeader right={{
        icon: "print",
        onPress: generatePDF,
      }} back title={"Family Tree"} />
      <View style={{ flex: 1 }}>
        {data && <FamilyTree data={data} />}
      </View>
    </View>
  );
};

export default FamilyMap;
const createFamilyTreeHTML = (data) => {
  const renderMember = (member) => {
    return `
      <div class="member">
        <img src="${member.profile_picture || APP_CONSTANTS.defaultAvatar}" 
             alt="${member.full_name_vn}"
             class="avatar" />
        <div class="name">${member.full_name_vn}</div>
        <div class="date">${member.birth_date}</div>
        ${member.death_date ? `<div class="date">${member.death_date}</div>` : ''}
      </div>
    `;
  };

  const renderTree = (members, level = 0) => {
    if (members.length === 0) return '';

    return `
      <ul class="level-${level}">
        ${members.map((member, index) => `
          <li>
            ${renderMember(member)}
            ${member.children && member.children.length > 0 ? renderTree(member.children, level + 1) : ''}
          </li>
        `).join('')}
      </ul>
    `;
  };

  const styles = `
    body { 
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      overflow-x: auto;
    }
    .tree {
      display: inline-block;
      white-space: nowrap;
      min-width: 100%;
      padding: 20px;
    }
    ul {
      padding-top: 20px;
      position: relative;
      transition: all 0.5s;
      display: flex;
      justify-content: center;
    }
    li {
      float: left;
      text-align: center;
      list-style-type: none;
      position: relative;
      padding: 20px 5px 0 5px;
    }
    li::before, li::after {
      content: '';
      position: absolute;
      top: 0;
      right: 50%;
      border-top: 2px solid #ccc;
      width: 50%;
      height: 20px;
    }
    li::after {
      right: auto;
      left: 50%;
      border-left: 2px solid #ccc;
    }
    li:only-child::after, li:only-child::before {
      display: none;
    }
    li:only-child {
      padding-top: 0;
    }
    li:first-child::before, li:last-child::after {
      border: 0 none;
    }
    li:last-child::before {
      border-right: 2px solid #ccc;
      border-radius: 0 5px 0 0;
    }
    li:first-child::after {
      border-radius: 5px 0 0 0;
    }
    ul ul::before {
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      border-left: 2px solid #ccc;
      width: 0;
      height: 20px;
    }
    .member {
      border: 2px solid #ccc;
      padding: 5px 10px;
      text-decoration: none;
      display: inline-block;
      border-radius: 5px;
      min-width: 100px;
    }
    .avatar {
      width: 80px;
      height: 80px;
      border-radius: 40px;
      margin-bottom: 5px;
    }
    .name {
      font-size: 14px;
      font-weight: bold;
    }
    .date {
      font-size: 12px;
    }
  `;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>${styles}</style>
      </head>
      <body>
        <div class="tree">
          ${renderTree([data])}
        </div>
      </body>
    </html>
  `;
};