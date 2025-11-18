'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Brain, Target, User } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import mockData from '@/../master-student.json';

export default function PsychometricsPage() {
  const { careerPrediction, cognitiveAbilities, personality, tagAnalysis } = mockData.psychometrics;

  const raisecData = Object.entries(careerPrediction.raisecProfile).map(([key, value]) => ({
    trait: key.charAt(0).toUpperCase() + key.slice(1),
    value
  }));

  const bigFiveData = Object.entries(personality.bigFive).map(([key, value]) => ({
    trait: key.charAt(0).toUpperCase() + key.slice(1),
    value
  }));

  return (
    <div className="min-h-screen p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-heading mb-2">Psychometrics</h1>
        <p className="text-sm">Comprehensive analysis of your cognitive abilities, personality, and career alignment</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            <CardTitle>Career Prediction</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-heading text-lg mb-3">Psyche Strengths & Patterns</h3>
            <div className="flex flex-wrap gap-2">
              {careerPrediction.customStrengths.map((strength, i) => (
                <Badge key={i} variant="default">{strength}</Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading text-lg mb-3">Subject Tags Analysis</h3>
            <p className="text-sm mb-3">Based on your performance across chapters, assignments, quizzes, and materials</p>
            <div className="space-y-2">
              {tagAnalysis.dominantTags.map((tag, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-base border-2 border-border bg-secondary-background shadow-shadow">
                  <div className="flex items-center gap-3">
                    <Badge variant={tag.strength === 'high' ? 'default' : 'outline'}>
                      {tag.strength.toUpperCase()}
                    </Badge>
                    <span className="font-base text-sm">{tag.tag.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                  </div>
                  <span className="text-xs">Frequency: {tag.frequency}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading text-lg mb-3">Fields of Interest</h3>
            <div className="flex flex-wrap gap-2">
              {careerPrediction.fieldsOfInterest.map((field, i) => (
                <Badge key={i} variant="outline">{field}</Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading text-lg mb-3">RAISEC Profile</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <ChartContainer config={{ value: { label: "Score", color: "hsl(var(--chart-1))" } }} className="h-[300px]">
                <RadarChart data={raisecData}>
                  <PolarGrid stroke="#d1d5db" strokeWidth={1.5} />
                  <PolarAngleAxis dataKey="trait" className="text-xs font-base" tick={{ fill: '#000' }} />
                  <Radar dataKey="value" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} strokeWidth={3} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </RadarChart>
              </ChartContainer>
              
              <div className="space-y-3">
                {Object.entries(careerPrediction.raisecProfile).map(([key, value]) => (
                  <div key={key}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-base capitalize">{key}</span>
                      <span className="text-sm font-bold">{value}%</span>
                    </div>
                    <div className="h-3 bg-secondary-background border-2 border-border rounded-base overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all" style={{ width: `${value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-heading text-lg mb-3">Career Recommendations</h3>
            <div className="space-y-3">
              {careerPrediction.recommendations.map((rec, i) => (
                <div key={i} className="p-4 rounded-base border-2 border-border bg-secondary-background shadow-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-heading">{rec.career}</h4>
                    <Badge variant="default">{rec.matchScore}% Match</Badge>
                  </div>
                  <p className="text-sm">{rec.reasoning}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            <CardTitle>Cognitive Abilities</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-base border-2 border-border bg-secondary-background shadow-shadow">
              <h4 className="font-heading mb-1">Raw Intelligence</h4>
              <p className="text-2xl font-bold">{cognitiveAbilities.rawIntelligence}</p>
              <p className="text-xs mt-1">{cognitiveAbilities.intelligenceCeiling}</p>
            </div>
            <div className="p-4 rounded-base border-2 border-border bg-secondary-background shadow-shadow">
              <h4 className="font-heading mb-1">Need for Cognition</h4>
              <p className="text-2xl font-bold">{cognitiveAbilities.needForCognition}%</p>
              <p className="text-xs mt-1">Desire for intellectual engagement</p>
            </div>
            <div className="p-4 rounded-base border-2 border-border bg-secondary-background shadow-shadow">
              <h4 className="font-heading mb-1">Learning Transfer</h4>
              <p className="text-2xl font-bold">{cognitiveAbilities.learningTransfer}%</p>
              <p className="text-xs mt-1">Ability to apply knowledge</p>
            </div>
          </div>
          <p className="text-sm p-4 rounded-base border-2 border-border bg-main shadow-shadow">
            {cognitiveAbilities.description}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5" />
            <CardTitle>Personality - Big Five</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <ChartContainer config={{ value: { label: "Score", color: "hsl(var(--chart-2))" } }} className="h-[300px]">
              <RadarChart data={bigFiveData}>
                <PolarGrid stroke="#d1d5db" strokeWidth={1.5} />
                <PolarAngleAxis dataKey="trait" className="text-xs font-base" tick={{ fill: '#000' }} />
                <Radar dataKey="value" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} strokeWidth={3} />
                <ChartTooltip content={<ChartTooltipContent />} />
              </RadarChart>
            </ChartContainer>
            
            <div className="space-y-3">
              {Object.entries(personality.bigFive).map(([key, value]) => (
                <div key={key}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-base capitalize">{key}</span>
                    <span className="text-sm font-bold">{value}%</span>
                  </div>
                  <div className="h-3 bg-secondary-background border-2 border-border rounded-base overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all" style={{ width: `${value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <p className="text-sm p-4 rounded-base border-2 border-border bg-main shadow-shadow">
            {personality.summary}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
