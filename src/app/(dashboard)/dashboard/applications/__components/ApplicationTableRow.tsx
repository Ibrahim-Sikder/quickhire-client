import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Building2,
  Calendar,
  Copy,
  ExternalLink,
  Eye,
  FileText,
  Mail,
  MoreVertical,
  Trash2,
} from "lucide-react";
import { Application } from "@/types/application";
import { COLORS } from "@/constant/color";
import { formatDate, getInitials } from "@/utils/application";

interface ApplicationTableRowProps {
  app: Application;
  onView: (app: Application) => void;
  onDelete: (id: string) => void;
}

export const ApplicationTableRow = ({
  app,
  onView,
  onDelete,
}: ApplicationTableRowProps) => (
  <TableRow className="group hover:bg-slate-50/50">
    <TableCell>
      <div className="flex items-center gap-3">
        <Avatar
          className="h-10 w-10 border-2"
          style={{ borderColor: COLORS.primary }}
        >
          <AvatarFallback
            style={{
              background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
            }}
            className="text-white"
          >
            {getInitials(app.name)}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium text-slate-900">{app.name}</div>
          <div className="text-sm text-slate-500 flex items-center gap-1">
            <Mail className="h-3 w-3" style={{ color: COLORS.primary }} />
            {app.email}
          </div>
        </div>
      </div>
    </TableCell>

    <TableCell>
      {app.job ? (
        <div>
          <div className="font-medium text-slate-900">{app.job.title}</div>
          <Badge
            variant="outline"
            className="mt-1"
            style={{
              backgroundColor: COLORS.primaryLight,
              color: COLORS.primary,
              borderColor: COLORS.primary,
            }}
          >
            {app.job.category}
          </Badge>
        </div>
      ) : (
        <Badge variant="secondary" className="bg-slate-100 text-slate-600">
          General Application
        </Badge>
      )}
    </TableCell>

    <TableCell>
      {app.job ? (
        <div className="flex items-center gap-1 text-slate-600">
          <Building2 className="h-4 w-4" style={{ color: COLORS.primary }} />
          {app.job.company}
        </div>
      ) : (
        <span className="text-slate-400">—</span>
      )}
    </TableCell>

    <TableCell>
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4" style={{ color: COLORS.primary }} />
        <div>
          <div className="text-sm font-medium text-slate-900">
            {new Date(app.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
          <div className="text-xs text-slate-500">
            {formatDate(app.createdAt)}
          </div>
        </div>
      </div>
    </TableCell>

    <TableCell>
      <a
        href={app.resume_link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 hover:underline"
        style={{ color: COLORS.primary }}
      >
        <FileText className="h-4 w-4" />
        <span className="text-sm">View</span>
        <ExternalLink className="h-3 w-3" />
      </a>
    </TableCell>

    <TableCell className="text-right">
      <div className="flex items-center justify-end gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                style={{
                  color: COLORS.secondary,
                  backgroundColor: COLORS.secondaryLight,
                }}
                onClick={() => onView(app)}
              >
                <Eye className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>View Details</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-red-50"
                style={{ color: "#ef4444" }}
                onClick={() => onDelete(app._id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Delete</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-2"
              onClick={() => window.open(`mailto:${app.email}`)}
            >
              <Mail className="h-4 w-4" style={{ color: COLORS.primary }} />
              Send Email
            </DropdownMenuItem>
            <DropdownMenuItem
              className="gap-2"
              onClick={() => window.open(app.resume_link, "_blank")}
            >
              <FileText className="h-4 w-4" style={{ color: COLORS.primary }} />
              View Resume
            </DropdownMenuItem>
            <DropdownMenuItem
              className="gap-2"
              onClick={() => navigator.clipboard.writeText(app.email)}
            >
              <Copy className="h-4 w-4" style={{ color: COLORS.primary }} />
              Copy Email
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </TableCell>
  </TableRow>
);
