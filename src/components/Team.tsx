import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Linkedin, Twitter, Mail } from 'lucide-react';

const Team = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Managing Partner',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: 'Former McKinsey partner with 20+ years of experience in strategic consulting across Fortune 500 companies.',
      linkedin: '#',
      twitter: '#',
      email: '#',
      gradient: 'from-black/60 to-black/80'
    },
    {
      name: 'Michael Chen',
      role: 'Operations Director',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: 'Expert in process optimization and digital transformation with a track record of delivering 30%+ efficiency gains.',
      linkedin: '#',
      twitter: '#',
      email: '#',
      gradient: 'from-accent-500 to-accent-600'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Financial Advisory Lead',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: 'CPA and former investment banker specializing in M&A advisory and financial restructuring.',
      linkedin: '#',
      twitter: '#',
      email: '#',
      gradient: 'from-primary-600 to-accent-500'
    },
    {
      name: 'David Thompson',
      role: 'Technology Practice Head',
      image: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: 'Former CTO with expertise in digital transformation and emerging technology adoption strategies.',
      linkedin: '#',
      twitter: '#',
      email: '#',
      gradient: 'from-black/80 to-black'
    },
    {
      name: 'Lisa Park',
      role: 'Organizational Development',
      image: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: 'HR executive and organizational psychologist focused on culture transformation and leadership development.',
      linkedin: '#',
      twitter: '#',
      email: '#',
      gradient: 'from-accent-500 to-accent-700'
    },
    {
      name: 'Robert Martinez',
      role: 'Risk Management Partner',
      image: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: 'Former audit partner with extensive experience in risk assessment and compliance across regulated industries.',
      linkedin: '#',
      twitter: '#',
      email: '#',
      gradient: 'from-black/40 to-black/60'
    }
  ];

  return (
    <section id="team" className="py-24 relative overflow-hidden bg-black/60">
      <div className="absolute inset-0 opacity-3">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,0,0,0.03) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}></div>
      </div>
      
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          className="absolute top-10 left-10 w-40 h-40 bg-accent-400/10 rounded-full blur-3xl"
          animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-10 right-10 w-56 h-56 bg-white/10 rounded-full blur-3xl"
          animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
      </motion.div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="inline-block px-4 py-1.5 bg-accent-500/40 text-accent-300   rounded-full text-sm font-medium mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Our Experts
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Meet Our Team
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Our diverse team of experts brings together decades of experience from top-tier consulting firms, 
            Fortune 500 companies, and leading academic institutions.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" ref={ref}>
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-white/20"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}></div>
              
              <div className="relative overflow-hidden">
                <motion.img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-72 object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.7 }}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-semibold text-white mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                    {member.name}
                  </h3>
                  <p className="text-accent-400 font-medium text-sm">
                    {member.role}
                  </p>
                </div>
                
                <motion.div 
                  className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                >
                  <div className="flex space-x-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {[
                      { icon: <Linkedin className="h-5 w-5" />, href: member.linkedin },
                      { icon: <Twitter className="h-5 w-5" />, href: member.twitter },
                      { icon: <Mail className="h-5 w-5" />, href: member.email }
                    ].map((social, i) => (
                      <motion.a
                        key={i}
                        href={social.href}
                        className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-accent-500 hover:scale-110 transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>
              
              <div className="p-6">
                <p className="text-black/ text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;