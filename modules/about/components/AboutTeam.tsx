import { Card, CardBody } from "@heroui/card";
import { useTranslation, Trans } from "react-i18next";

interface TeamMember {
  key: string;
  imageId: string;
}

const teamMembers: TeamMember[] = [
  {
    key: "maria",
    imageId: "maria",
  },
  {
    key: "carlos",
    imageId: "carlos",
  },
  {
    key: "ana",
    imageId: "ana",
  },
  {
    key: "diego",
    imageId: "diego",
  },
];

export default function AboutTeam() {
  const { t } = useTranslation();

  return (
    <section id="team" className="py-20 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            <Trans
              i18nKey="about.team.title"
              components={{
                1: <span className="text-sky-600" />,
              }}
            />
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {t("about.team.description")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Card
              key={member.key}
              className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardBody className="p-6 text-center space-y-4">
                <div className="relative mx-auto w-24 h-24 mb-4">
                  <img
                    src={`https://picsum.photos/seed/${member.imageId}/200/200`}
                    alt={t(`about.team.members.${member.key}.name`)}
                    className="w-full h-full rounded-full object-cover"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-sky-600/20 to-transparent" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-900">
                    {t(`about.team.members.${member.key}.name`)}
                  </h3>
                  <p className="text-sky-600 font-semibold">
                    {t(`about.team.members.${member.key}.role`)}
                  </p>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">
                  {t(`about.team.members.${member.key}.bio`)}
                </p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
