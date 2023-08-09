import { SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "../../../src/components/Themed";
import { COLOR } from "@/styles/COLOR";
import Header from "@/components/layout/Header";
import { useRouter } from "expo-router";
import { TEXT } from "@/styles/TEXT";
import CardLayoutThin from "@/components/layout/CardLayoutThin";
import { FlatList } from "react-native";
import CommonFooter from "@/components/layout/CommonFooter";
import { formatDateToThaiDate } from "@/utils/format";
import { AntDesign } from "@expo/vector-icons";

const mockData = [
  {
    id: "75263548123",
    name: "โครงการการจัดการเทคโนโลยีและนวัตกรรม เชิงบูรณาการจากไม้ผล/ประมง/ปศุสัตว์ : ทางเลือกใหม่ให้เกษตรกรสวนยางในเขตพื้นที่ ริมแม่น้ำโขง",
    status: "เกินระยะเวลาโครงการ",
    end_date: "2023-05-30",
  },
  {
    id: "75263548124",
    name: "การยกระดับความรู้การคัดเลือกเมล็ดพันธุ์ข้าว เพื่อการผลิตข้าวที่มีคุณภาพ",
    status: "ใกล้ถึงกำหนดเวลา",
    end_date: "2023-07-30",
  },
  {
    id: "75263548125",
    name: "การยกระดับความรู้การคัดเลือกเมล็ดพันธุ์ข้าว เพื่อการผลิตข้าวที่มีคุณภาพ",
    status: "อนุมัติการเบิกจ่ายงวดที่ 2",
    end_date: "2023-07-30",
  },
];

export default function notification() {
  const router = useRouter();

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <TouchableOpacity style={{ marginBottom: 15 }}>
        <CardLayoutThin
          themeColor={index === 0 ? COLOR.PINK : COLOR.DARKGREEN2}
          containerStyle={{
            paddingHorizontal: 17,
            paddingVertical: 11,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: COLOR.WHITE,
              marginBottom: 6,
            }}
          >
            <Text style={{ ...TEXT.label3Thin, color: COLOR.DARKGRAY }}>
              ID {item.id}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: COLOR.WHITE,
                gap: 8,
              }}
            >
              <View
                style={{
                  height: 10,
                  width: 10,
                  borderRadius: 10,
                  backgroundColor: index === 0 ? COLOR.PINK : COLOR.DARKGREEN2,
                }}
              />
              <Text
                style={{
                  ...TEXT.caption2,
                  color: index === 0 ? COLOR.PINK : COLOR.DARKGREEN2,
                }}
              >
                {item.status}
              </Text>
            </View>
          </View>
          <Text
            style={{
              ...TEXT.caption1,
              color: COLOR.BLUE,
            }}
          >
            {item.name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: COLOR.WHITE,
              marginTop: 19,
            }}
          >
            <View style={{ backgroundColor: COLOR.WHITE }}>
              <Text style={{ ...TEXT.caption2, color: COLOR.BLACK }}>
                วันสิ้นสุดโครงการ
              </Text>
              <Text style={{ ...TEXT.caption1, color: COLOR.DARKGRAY }}>
                {formatDateToThaiDate(item.end_date, false, false, false, true)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: COLOR.WHITE,
                gap: 8,
              }}
            >
              <Text
                style={{
                  ...TEXT.body1,
                  color: index === 0 ? COLOR.PINK : COLOR.DARKGREEN2,
                }}
              >
                {index === 0 ? "เกินเวลา 2 วัน" : "อีก 3 วัน"}
              </Text>
              <View
                style={{
                  height: 20,
                  width: 20,
                  borderRadius: 20,
                  // backgroundColor: index === 0 ? COLOR.PINK : COLOR.DARKGREEN2,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AntDesign
                  name="rightcircle"
                  size={20}
                  color={index === 0 ? COLOR.PINK : COLOR.DARKGREEN2}
                />
              </View>
            </View>
          </View>
        </CardLayoutThin>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flexGrow: 1, backgroundColor: COLOR.OFFWHITE }}>
        <Header
          title={"แจ้งเตือนโครงการ"}
          height={150}
          rightIcon={false}
          headerTextStyle={{ ...TEXT.header5BOLD, color: COLOR.WHITE }}
        />

        <View
          style={{
            flex: 1,
            paddingHorizontal: 20,
            backgroundColor: COLOR.TRANSPARENT,
            marginTop: 36,
          }}
        >
          <FlatList
            data={mockData}
            keyExtractor={(item: any) => item.id}
            renderItem={renderItem}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={() => <CommonFooter bottom={50} />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
