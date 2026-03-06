import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Calendar,
  ExternalLink,
  FileText,
  Mail,
  MapPin,
} from "lucide-react";
import { Application } from "@/types/application";
import { COLORS } from "@/constant/color";
import { getInitials } from "@/utils/application";

interface ApplicationModalProps {
  application: Application | null;
  onClose: () => void;
}

export const ApplicationModal = ({
  application,
  onClose,
}: ApplicationModalProps) => {
  if (!application) return null;

  return (
    <Dialog open={!!application} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Application Details</DialogTitle>
          <DialogDescription>
            Review the candidate s application information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Candidate Info */}
          <div
            className="flex items-start gap-4 p-4 rounded-lg"
            style={{
              background: `linear-gradient(to right, ${COLORS.primaryLight}, ${COLORS.secondaryLight})`,
            }}
          >
            <Avatar className="h-16 w-16 border-2 border-white shadow-md">
              <AvatarFallback
                style={{
                  background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
                }}
                className="text-white text-xl"
              >
                {getInitials(application.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-slate-900">
                {application.name}
              </h3>
              <div className="flex items-center gap-2 mt-1 text-slate-600">
                <Mail className="h-4 w-4" style={{ color: COLORS.primary }} />
                {application.email}
              </div>
              <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">
                <Calendar
                  className="h-4 w-4"
                  style={{ color: COLORS.primary }}
                />
                Applied on{" "}
                {new Date(application.createdAt).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>

          {/* Job Info */}
          {application.job ? (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-slate-900 uppercase tracking-wider">
                Applied Position
              </h4>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-semibold text-slate-900">
                    {application.job.title}
                  </h5>
                  <Badge
                    style={{
                      backgroundColor: COLORS.primaryLight,
                      color: COLORS.primary,
                      borderColor: COLORS.primary,
                    }}
                  >
                    {application.job.category}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-1 text-slate-600">
                    <Building2
                      className="h-4 w-4"
                      style={{ color: COLORS.primary }}
                    />
                    {application.job.company}
                  </div>
                  <div className="flex items-center gap-1 text-slate-600">
                    <MapPin
                      className="h-4 w-4"
                      style={{ color: COLORS.primary }}
                    />
                    {application.job.location}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-slate-600">
                General Application (not for a specific job)
              </p>
            </div>
          )}

          {/* Resume Link */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-slate-900 uppercase tracking-wider">
              Resume
            </h4>
            <a
              href={application.resume_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-3 rounded-lg transition-colors"
              style={{
                backgroundColor: COLORS.primaryLight,
                color: COLORS.primary,
              }}
            >
              <FileText className="h-5 w-5" />
              <span className="flex-1 font-medium">View Resume</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          {/* Cover Note */}
          {application.cover_note && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-slate-900 uppercase tracking-wider">
                Cover Note
              </h4>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-slate-700 whitespace-pre-wrap">
                  {application.cover_note}
                </p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="border-t border-slate-200 pt-4">
          <div className="flex gap-2 w-full justify-end">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button
              onClick={() => window.open(`mailto:${application.email}`)}
              style={{ backgroundColor: COLORS.primary }}
              className="hover:opacity-90 text-white"
            >
              <Mail className="h-4 w-4 mr-2" />
              Send Email
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
