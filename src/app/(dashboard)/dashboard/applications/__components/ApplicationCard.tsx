import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Building2,
  Calendar,
  Eye,
  FileText,
  Mail,
  MapPin,
  Trash2,
} from "lucide-react";
import { Application } from "@/types/application";
import { COLORS } from "@/constant/color";
import { formatDate, getInitials } from "@/utils/application";
import { cn } from "@/lib/utils";

interface ApplicationCardProps {
  app: Application;
  onView: (app: Application) => void;
  onDelete: (id: string) => void;
}

export const ApplicationCard = ({
  app,
  onView,
  onDelete,
}: ApplicationCardProps) => (
  <Card className="border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
    <CardHeader className="pb-2">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar
            className="h-12 w-12 border-2"
            style={{ borderColor: COLORS.primary }}
          >
            <AvatarFallback
              style={{
                background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
              }}
              className="text-white text-lg"
            >
              {getInitials(app.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{app.name}</CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <Mail className="h-3 w-3" style={{ color: COLORS.primary }} />
              {app.email}
            </CardDescription>
          </div>
        </div>
        <Badge
          variant="outline"
          className={cn(
            app.job
              ? "bg-green-50 text-green-700 border-green-200"
              : "bg-slate-100 text-slate-600 border-slate-200",
          )}
        >
          {app.job ? "Specific" : "General"}
        </Badge>
      </div>
    </CardHeader>

    <CardContent className="space-y-3">
      {app.job && (
        <div
          className="p-3 rounded-lg border"
          style={{
            backgroundColor: COLORS.primaryLight,
            borderColor: COLORS.primary,
          }}
        >
          <p className="text-sm font-medium" style={{ color: COLORS.primary }}>
            {app.job.title}
          </p>
          <div
            className="flex items-center gap-2 mt-1 text-xs"
            style={{ color: COLORS.primary }}
          >
            <Building2 className="h-3 w-3" />
            {app.job.company}
            <span style={{ color: COLORS.primary }}>•</span>
            <MapPin className="h-3 w-3" />
            {app.job.location}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-1 text-slate-500">
          <Calendar className="h-4 w-4" style={{ color: COLORS.primary }} />
          {formatDate(app.createdAt)}
        </div>
        <a
          href={app.resume_link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 hover:underline text-sm"
          style={{ color: COLORS.primary }}
        >
          <FileText className="h-4 w-4" />
          Resume
        </a>
      </div>

      {app.cover_note && (
        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-xs font-medium text-slate-500 mb-1">Cover Note:</p>
          <p className="text-sm text-slate-700 line-clamp-2">
            {app.cover_note}
          </p>
        </div>
      )}
    </CardContent>

    <CardFooter className="border-t border-slate-100 pt-4 flex justify-between">
      <Button
        variant="ghost"
        size="sm"
        style={{
          color: COLORS.primary,
          backgroundColor: COLORS.primaryLight,
        }}
        onClick={() => onView(app)}
      >
        <Eye className="h-4 w-4 mr-2" />
        Details
      </Button>
      <div className="flex gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          style={{
            color: COLORS.secondary,
            backgroundColor: COLORS.secondaryLight,
          }}
          onClick={() => window.open(`mailto:${app.email}`)}
        >
          <Mail className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:bg-red-50"
          style={{ color: "#ef4444" }}
          onClick={() => onDelete(app._id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </CardFooter>
  </Card>
);
