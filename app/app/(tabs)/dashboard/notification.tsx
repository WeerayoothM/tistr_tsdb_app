import { SafeAreaView, TouchableOpacity } from "react-native";

import { Text, View } from "../../../src/components/Themed";
import { COLOR } from "@/styles/COLOR";
import Header from "@/components/layout/Header";
import { TEXT } from "@/styles/TEXT";
import CardLayoutThin from "@/components/layout/CardLayoutThin";
import { FlatList } from "react-native";
import CommonFooter from "@/components/layout/CommonFooter";
import { formatDateToThaiDate } from "@/utils/format";
import { useEffect, useState } from "react";
import { getNoti, updateReadNoti } from "./apis";
import { useAuth } from "@/context/AuthProvider";
import { Notification } from "@/context/ProjectContext";

export default function notification() {
  const { user } = useAuth();
  const [notiList, setNotiList] = useState<Notification[]>([]);

  const fetchNoti = async () => {
    try {
      const resp = await getNoti(user.EmpId);

      setNotiList(() => resp);
    } catch (e) {
      console.log(e);
    }
  };

  const readNoti = async (notifyId: number) => {
    setNotiList((prev: Notification[]) => {
      const newNotiList = prev.map((item) => {
        if (item.notify_id === notifyId) {
          return { ...item, status_read: "Y" };
        }
        return item;
      });
      return newNotiList;
    });

    await updateReadNoti(notifyId);
  };

  useEffect(() => {
    fetchNoti();
  }, []);

  const renderItem = ({ item }: { item: any; index: number }) => {
    return (
      <TouchableOpacity
        style={{ marginBottom: 15 }}
        onPress={() => readNoti(item.notify_id)}
      >
        <CardLayoutThin
          themeColor={"N" === item.status_read ? COLOR.PINK : COLOR.DARKGREEN2}
          containerStyle={{
            paddingHorizontal: 17,
            paddingVertical: 11,
          }}
        >
          <Text
            style={{
              ...TEXT.caption1,
              color: COLOR.BLUE,
            }}
          >
            {item.message}
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
                วันที่อัพเดท
              </Text>
              <Text style={{ ...TEXT.caption1, color: COLOR.DARKGRAY }}>
                {formatDateToThaiDate(
                  item.update_date,
                  false,
                  false,
                  false,
                  true
                )}
              </Text>
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
            data={notiList}
            keyExtractor={(item) => item.notify_id}
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
