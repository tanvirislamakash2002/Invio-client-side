"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";
import { format } from "date-fns";

interface RecentActivitiesProps {
  activities: {
    id: string;
    action: string;
    description: string;
    createdAt: string;
    user?: { name: string };
  }[];
}

export function RecentActivities({ activities }: RecentActivitiesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 pb-3 border-b last:border-0">
              <div className="rounded-full bg-primary/10 p-2">
                <Activity className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{activity.description}</p>
                <div className="flex gap-2 text-xs text-muted-foreground">
                  <span>{format(new Date(activity.createdAt), "hh:mm a")}</span>
                  <span>•</span>
                  <span>{activity.user?.name || "System"}</span>
                </div>
              </div>
            </div>
          ))}
          {activities.length === 0 && (
            <p className="text-center text-muted-foreground py-4">No recent activities</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}