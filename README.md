import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const users = ["山田", "田中", "佐藤"];

export default function AttendanceApp() {
  const [selectedUser, setSelectedUser] = useState("");
  const [logs, setLogs] = useState([]);

  const getAttendanceNote = (type, date) => {
    const hour = date.getHours();
    const minute = date.getMinutes();
    const totalMinutes = hour * 60 + minute;

    if (type === "出勤") {
      if (totalMinutes <= 9 * 60) return "（定時）";
      else return "（遅め）";
    } else {
      if (totalMinutes < 18 * 60) return "（早退）";
      else return "（残業）";
    }
  };

  const handleAction = (type) => {
    if (!selectedUser) return alert("ユーザーを選択してください。");
    const now = new Date();
    const timestamp = now.toLocaleString("ja-JP");
    const note = getAttendanceNote(type, now);
    const newLog = `${timestamp} ${selectedUser}さんが${type}${note}`;
    setLogs([newLog, ...logs]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardContent className="p-6 space-y-4">
          <h1 className="text-2xl font-bold text-center">出勤退勤アプリ</h1>

          <Select onValueChange={(value) => setSelectedUser(value)}>
            <SelectTrigger>
              <SelectValue placeholder="ユーザーを選択" />
            </SelectTrigger>
            <SelectContent>
              {users.map((user) => (
                <SelectItem key={user} value={user}>
                  {user}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex justify-between gap-4">
            <Button onClick={() => handleAction("出勤")}>出勤</Button>
            <Button onClick={() => handleAction("退勤")} variant="outline">
              退勤
            </Button>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">履歴</h2>
            <ul className="space-y-1 text-sm">
              {logs.map((log, index) => (
                <li key={index} className="bg-white p-2 rounded shadow-sm">
                  {log}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
