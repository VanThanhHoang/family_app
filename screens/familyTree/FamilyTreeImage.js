import React, { useRef, useState, useEffect } from 'react';
import { View, Dimensions } from 'react-native';
import ViewShot from "react-native-view-shot";
import FamilyTree from "./FamilyTree";

const FamilyTreeImage = ({ data, onCapture }) => {
  const viewShotRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Tính toán kích thước cần thiết cho FamilyTree
    const calculateDimensions = (treeData) => {
      let maxWidth = 0;
      let maxDepth = 0;

      const traverse = (node, depth) => {
        maxDepth = Math.max(maxDepth, depth);
        if (node.children) {
          maxWidth += node.children.length;
          node.children.forEach(child => traverse(child, depth + 1));
        } else {
          maxWidth = Math.max(maxWidth, 1);
        }
      };

      traverse(treeData, 1);

      // Ước tính kích thước dựa trên số lượng node và độ sâu của cây
      const estimatedWidth = maxWidth * 150; // 150 là ước lượng chiều rộng cho mỗi node
      const estimatedHeight = maxDepth * 200; // 200 là ước lượng chiều cao cho mỗi cấp

      setDimensions({ width: estimatedWidth, height: estimatedHeight });
    };

    calculateDimensions(data);
  }, [data]);

  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      viewShotRef.current.capture().then(onCapture);
    }
  }, [dimensions, onCapture]);

  return (
    <ViewShot ref={viewShotRef} options={{ format: "jpg", quality: 0.9 }}>
      <View style={{ width: dimensions.width, height: dimensions.height }}>
        <FamilyTree data={data} />
      </View>
    </ViewShot>
  );
};

export default FamilyTreeImage;